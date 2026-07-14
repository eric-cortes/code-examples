import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  synthesizeSpeech,
  synthesizeSpeechStream,
  type PcmEncoding,
} from "../api/client";
import { getPatientSpeechVoice } from "../patient-voice";
import type { SessionLanguage } from "../types";

const FIRST_CHUNK_TIMEOUT_MS = 2500;

type PcmStreamHandle = {
  stop: () => void;
};

type PcmStreamCallbacks = {
  onFirstAudio: () => void;
  onEnded: () => void;
  onError: (error: unknown) => void;
};

export function isPatientSpeechSupported() {
  return typeof window !== "undefined" && typeof Audio !== "undefined";
}

let sharedAudioContext: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!sharedAudioContext || sharedAudioContext.state === "closed") {
    sharedAudioContext = new AudioContextCtor();
  }
  return sharedAudioContext;
}

function playPcmStream(
  body: ReadableStream<Uint8Array>,
  sampleRate: number,
  encoding: PcmEncoding,
  callbacks: PcmStreamCallbacks,
): PcmStreamHandle | null {
  const PREBUFFER_SECONDS = 0.3;
  const START_SAFETY_MARGIN_SECONDS = 0.1;

  const audioContext = getSharedAudioContext();
  if (!audioContext) {
    callbacks.onError(new Error("AudioContext is not supported"));
    return null;
  }

  let stopped = false;
  let pendingBytes = new Uint8Array(0);
  let nextStartTime = 0;
  let scheduledCount = 0;
  let endedCount = 0;
  let streamDone = false;
  let playbackStarted = false;
  let pendingSampleFrames = 0;
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  const pendingSampleQueue: Float32Array<ArrayBuffer>[] = [];
  const sources: AudioBufferSourceNode[] = [];
  const bytesPerSample = encoding === "pcm_f32le" ? 4 : 2;

  const firstChunkTimeout = setTimeout(() => {
    if (stopped || scheduledCount > 0) return;
    stopped = true;
    void reader?.cancel().catch(() => {});
    callbacks.onError(
      new Error(
        `No PCM audio received within ${FIRST_CHUNK_TIMEOUT_MS}ms of opening the stream`,
      ),
    );
  }, FIRST_CHUNK_TIMEOUT_MS);

  const finishIfDone = () => {
    if (streamDone && endedCount >= scheduledCount) callbacks.onEnded();
  };

  const scheduleChunk = (samples: Float32Array<ArrayBuffer>) => {
    if (stopped || samples.length === 0) return;

    if (!playbackStarted) {
      playbackStarted = true;
      nextStartTime = audioContext.currentTime + START_SAFETY_MARGIN_SECONDS;
    } else if (nextStartTime <= audioContext.currentTime) {
      nextStartTime = audioContext.currentTime + START_SAFETY_MARGIN_SECONDS;
    }

    const buffer = audioContext.createBuffer(1, samples.length, sampleRate);
    buffer.copyToChannel(samples, 0);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.onended = () => {
      endedCount += 1;
      finishIfDone();
    };

    const startAt = nextStartTime;
    source.start(startAt);
    nextStartTime = startAt + buffer.duration;
    scheduledCount += 1;
    sources.push(source);

    if (scheduledCount === 1) {
      clearTimeout(firstChunkTimeout);
      callbacks.onFirstAudio();
    }
  };

  const flushPendingSamples = (forceStart = false) => {
    if (stopped || pendingSampleQueue.length === 0) return;

    const bufferedDuration = pendingSampleFrames / sampleRate;
    if (
      !forceStart &&
      !playbackStarted &&
      bufferedDuration < PREBUFFER_SECONDS
    ) {
      return;
    }

    while (pendingSampleQueue.length > 0) {
      const samples = pendingSampleQueue.shift();
      if (!samples) break;
      pendingSampleFrames -= samples.length;
      scheduleChunk(samples);
    }
  };

  const decodeAndSchedule = (chunk: Uint8Array) => {
    const combined = new Uint8Array(pendingBytes.length + chunk.length);
    combined.set(pendingBytes, 0);
    combined.set(chunk, pendingBytes.length);

    const usableLength = combined.length - (combined.length % bytesPerSample);
    const usable = combined.subarray(0, usableLength);
    pendingBytes = combined.slice(usableLength);
    if (usable.length === 0) return;

    const sampleCount = usable.length / bytesPerSample;
    const samples = new Float32Array(sampleCount);
    const view = new DataView(
      usable.buffer,
      usable.byteOffset,
      usable.byteLength,
    );

    if (encoding === "pcm_f32le") {
      for (let i = 0; i < sampleCount; i += 1)
        samples[i] = view.getFloat32(i * 4, true);
    } else {
      for (let i = 0; i < sampleCount; i += 1)
        samples[i] = view.getInt16(i * 2, true) / 32768;
    }

    pendingSampleQueue.push(samples);
    pendingSampleFrames += samples.length;
    flushPendingSamples();
  };

  void (async () => {
    try {
      if (audioContext.state === "suspended") {
        await audioContext.resume().catch(() => {});
      }

      reader = body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (stopped) {
          await reader.cancel().catch(() => {});
          return;
        }
        if (done) break;
        if (value && value.length > 0) decodeAndSchedule(value);
      }

      streamDone = true;
      flushPendingSamples(true);
      if (scheduledCount === 0) {
        if (!stopped) {
          stopped = true;
          clearTimeout(firstChunkTimeout);
          callbacks.onError(new Error("Speech stream ended with no audio"));
        }
      } else {
        finishIfDone();
      }
    } catch (error) {
      if (!stopped) {
        stopped = true;
        clearTimeout(firstChunkTimeout);
        callbacks.onError(error);
      }
    }
  })();

  return {
    stop: () => {
      stopped = true;
      clearTimeout(firstChunkTimeout);
      pendingSampleQueue.length = 0;
      pendingSampleFrames = 0;
      for (const source of sources) {
        source.onended = null;
        try {
          source.stop();
        } catch {
          // Already stopped/ended.
        }
      }
      void reader?.cancel().catch(() => {});
    },
  };
}

function splitIntoChunks(text: string, maxLength = 220) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentences = normalized.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (!sentence) continue;

    if (!current) {
      current = sentence;
      continue;
    }

    const next = `${current} ${sentence}`;
    if (next.length <= maxLength) {
      current = next;
      continue;
    }

    chunks.push(current);
    current = sentence;
  }

  if (current) chunks.push(current);
  return chunks;
}

export function usePatientSpeech(
  enabled: boolean,
  patientId?: string,
  patientName?: string,
  language?: SessionLanguage,
) {
  const supported = useMemo(() => isPatientSpeechSupported(), []);
  const browserSpeechSupported = useMemo(
    () =>
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      typeof SpeechSynthesisUtterance !== "undefined",
    [],
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const tokenRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const streamHandleRef = useRef<PcmStreamHandle | null>(null);

  const clearAudio = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    if (streamHandleRef.current) {
      streamHandleRef.current.stop();
      streamHandleRef.current = null;
    }
  }, []);

  const speakWithBrowser = useCallback(
    (text: string, playbackToken: number, fallbackLanguage?: SessionLanguage) =>
      new Promise<void>((resolve, reject) => {
        if (!browserSpeechSupported) {
          reject(new Error("Browser speech synthesis is not supported"));
          return;
        }

        const chunks = splitIntoChunks(text);
        if (chunks.length === 0) {
          resolve();
          return;
        }

        window.speechSynthesis.cancel();
        let index = 0;

        const speakNextChunk = () => {
          if (playbackToken !== tokenRef.current) {
            resolve();
            return;
          }

          const chunk = chunks[index];
          if (!chunk) {
            resolve();
            return;
          }

          const utterance = new SpeechSynthesisUtterance(chunk);
          utterance.lang = fallbackLanguage === "de" ? "de-DE" : "en-US";
          utterance.onend = () => {
            if (playbackToken !== tokenRef.current) {
              resolve();
              return;
            }
            index += 1;
            speakNextChunk();
          };
          utterance.onerror = () => {
            if (playbackToken !== tokenRef.current) {
              resolve();
              return;
            }
            reject(new Error("Browser speech playback failed"));
          };

          window.speechSynthesis.speak(utterance);
        };

        speakNextChunk();
      }),
    [browserSpeechSupported],
  );

  const playBlobSegment = useCallback(
    async (value: string, playbackToken: number, voice?: string) => {
      const controller = new AbortController();
      controllerRef.current = controller;
      const allowBrowserFallback = language !== "de";

      try {
        const audioBlob = await synthesizeSpeech(
          value,
          controller.signal,
          voice,
          language,
        );
        if (playbackToken !== tokenRef.current) return;

        const nextAudioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = nextAudioUrl;

        await new Promise<void>((resolve, reject) => {
          const audio = new Audio(nextAudioUrl);
          audioRef.current = audio;
          audio.onended = () => {
            clearAudio();
            resolve();
          };
          audio.onerror = () => {
            clearAudio();
            reject(new Error("Speech playback failed after synthesis"));
          };
          void audio.play().catch(reject);
        });
      } catch (error) {
        if (controller.signal.aborted || playbackToken !== tokenRef.current) {
          return;
        }
        clearAudio();
        if (allowBrowserFallback) {
          await speakWithBrowser(value, playbackToken, language);
          return;
        }
        throw error instanceof Error
          ? error
          : new Error("German patient speech synthesis failed");
      } finally {
        if (controllerRef.current === controller) controllerRef.current = null;
      }
    },
    [clearAudio, language, speakWithBrowser],
  );

  const playStreamSegment = useCallback(
    async (value: string, playbackToken: number, voice?: string) => {
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const { body, sampleRate, encoding } = await synthesizeSpeechStream(
          value,
          controller.signal,
          voice,
          language,
        );

        if (playbackToken !== tokenRef.current) {
          await body.cancel().catch(() => {});
          return;
        }

        await new Promise<void>((resolve, reject) => {
          let firstAudioScheduled = false;

          const handle = playPcmStream(body, sampleRate, encoding, {
            onFirstAudio: () => {
              firstAudioScheduled = true;
            },
            onEnded: () => {
              streamHandleRef.current = null;
              resolve();
            },
            onError: (streamError) => {
              streamHandleRef.current = null;
              if (playbackToken !== tokenRef.current) {
                resolve();
                return;
              }

              if (!firstAudioScheduled) {
                console.warn(
                  "Speech stream produced no audio, falling back to buffered synthesis",
                  streamError,
                );
                void (async () => {
                  try {
                    await playBlobSegment(value, playbackToken, voice);
                    resolve();
                  } catch (fallbackError) {
                    reject(fallbackError);
                  }
                })();
                return;
              }

              reject(
                streamError instanceof Error
                  ? streamError
                  : new Error("Speech streaming failed during playback"),
              );
            },
          });

          if (!handle) return;

          streamHandleRef.current = handle;
        });
      } catch (error) {
        if (controller.signal.aborted || playbackToken !== tokenRef.current) {
          return;
        }
        console.warn(
          "Speech streaming unavailable, falling back to buffered synthesis",
          error,
        );
        await playBlobSegment(value, playbackToken, voice);
      } finally {
        if (controllerRef.current === controller) controllerRef.current = null;
      }
    },
    [language, playBlobSegment],
  );

  const playSegment = useCallback(
    async (value: string, playbackToken: number, voice?: string) => {
      await playStreamSegment(value, playbackToken, voice);
    },
    [playStreamSegment],
  );

  const cancel = useCallback(() => {
    tokenRef.current += 1;
    controllerRef.current?.abort();
    controllerRef.current = null;
    clearAudio();
    if (browserSpeechSupported) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setLastError(null);
  }, [browserSpeechSupported, clearAudio]);

  const speak = useCallback(
    async (text: string) => {
      const value = text.trim();
      if (!value || !enabled || !supported) return;

      cancel();
      setLastError(null);
      const playbackToken = tokenRef.current;
      const voice = language
        ? getPatientSpeechVoice(patientId, patientName, language)
        : undefined;

      setIsSpeaking(true);

      try {
        await playSegment(value, playbackToken, voice);
      } catch (error) {
        if (playbackToken === tokenRef.current) {
          setLastError(
            error instanceof Error ? error.message : "Patient speech failed",
          );
        }
      } finally {
        if (
          playbackToken === tokenRef.current &&
          !streamHandleRef.current &&
          !audioRef.current
        ) {
          setIsSpeaking(false);
        }
      }
    },
    [cancel, enabled, language, patientId, patientName, playSegment, supported],
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    isSupported: supported,
    isSpeaking,
    speak,
    cancel,
    lastError,
  };
}
