import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { transcribeAudio } from "../api/client";
import type { SessionLanguage } from "../types";
import { Button, Input } from "./UI";

export function MessageInput({
  onSend,
  disabled,
  onRecordingStart,
  therapistVoiceInputEnabled,
  sessionLanguage,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
  onRecordingStart?: () => void;
  therapistVoiceInputEnabled: boolean;
  sessionLanguage: SessionLanguage;
}) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceWarning, setVoiceWarning] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const composerRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef("");
  const shouldRestoreFocusRef = useRef(false);

  const sendText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || disabled) return;
      if (!therapistVoiceInputEnabled) {
        shouldRestoreFocusRef.current = true;
      }
      onSend(trimmed);
      valueRef.current = "";
      setValue("");
    },
    [disabled, onSend, therapistVoiceInputEnabled],
  );

  const submit = useCallback(() => {
    if (isTranscribing) return;
    sendText(valueRef.current);
  }, [isTranscribing, sendText]);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async () => {
    if (disabled || isTranscribing) return;

    try {
      onRecordingStart?.();
      setVoiceError(null);
      setVoiceWarning(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        stopTracks();
        setIsRecording(false);

        if (!blob.size) return;

        try {
          setIsTranscribing(true);
          const result = await transcribeAudio(blob, sessionLanguage);
          const transcript = result.text.trim();
          if (!transcript) return;

          if (result.provider === "mock") {
            setVoiceWarning(t("chat.mockTranscriptionWarning"));
          }

          const nextText = valueRef.current.trim()
            ? `${valueRef.current.trim()} ${transcript}`
            : transcript;

          sendText(nextText);
        } catch (error) {
          setVoiceError(
            error instanceof Error
              ? error.message
              : t("chat.transcriptionFailed"),
          );
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch {
      setVoiceError(t("chat.microphoneUnavailable"));
      stopTracks();
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") return;
    recorder.stop();
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    void startRecording();
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const active = document.activeElement;
      const isWithinComposer =
        active instanceof Node &&
        Boolean(composerRef.current?.contains(active));
      const isPageBody = active === document.body || active === null;

      const isEditableElement =
        active instanceof HTMLElement &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);

      const isMicShortcut =
        therapistVoiceInputEnabled &&
        event.key.toLowerCase() === "o" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        !event.isComposing;

      if (isMicShortcut) {
        if (disabled || isTranscribing) return;
        if (isEditableElement) return;
        if (!isWithinComposer && !isPageBody) return;

        event.preventDefault();
        toggleRecording();
        return;
      }

      const isEnterShortcut =
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.isComposing;

      if (!isEnterShortcut || disabled || isTranscribing) return;
      if (!isWithinComposer && !isPageBody) return;

      event.preventDefault();
      submit();
    };

    document.addEventListener("keydown", handleShortcut, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleShortcut, {
        capture: true,
      });
  }, [
    disabled,
    isTranscribing,
    isRecording,
    onRecordingStart,
    submit,
    therapistVoiceInputEnabled,
  ]);

  useEffect(() => {
    if (therapistVoiceInputEnabled) {
      shouldRestoreFocusRef.current = false;
      return;
    }
    if (!shouldRestoreFocusRef.current) return;
    if (disabled || isTranscribing) return;

    const input = inputRef.current;
    if (!input) return;

    input.focus();
    const length = input.value.length;
    input.setSelectionRange(length, length);
    shouldRestoreFocusRef.current = false;
  }, [disabled, isTranscribing, therapistVoiceInputEnabled]);

  return (
    <div className="border-t border-line p-3">
      <label className="mb-2 block text-sm text-ink-muted">
        {t("chat.therapistMessage")}
      </label>
      <form
        ref={composerRef}
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            valueRef.current = e.target.value;
            setValue(e.target.value);
          }}
          onKeyDown={(event) => {
            if (
              event.key !== "Enter" ||
              event.shiftKey ||
              event.nativeEvent.isComposing
            ) {
              return;
            }
            if (event.defaultPrevented) return;
            event.preventDefault();
            submit();
          }}
          placeholder={
            therapistVoiceInputEnabled
              ? t("chat.voiceModeEnabled")
              : t("chat.typeTherapistMessage")
          }
          disabled={disabled || isTranscribing || therapistVoiceInputEnabled}
          className="flex-1"
        />
        {therapistVoiceInputEnabled ? (
          <Button
            type="button"
            onClick={toggleRecording}
            disabled={disabled || isTranscribing}
            className="border border-warning"
            title={
              isRecording ? t("chat.stopRecording") : t("chat.recordVoice")
            }
            aria-keyshortcuts="O"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-sm">
                {isRecording ? t("common.stop") : t("common.microphone")}
              </span>
              <span className="text-xs opacity-60">{t("chat.keyO")}</span>
            </span>
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={disabled || isTranscribing || !value.trim()}
            title={t("chat.sendEnter")}
            aria-keyshortcuts="Enter"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-sm">{t("common.send")}</span>
              <span className="text-xs opacity-60">{t("chat.enterKey")}</span>
            </span>
          </Button>
        )}
      </form>
      {isRecording ? (
        <p className="mt-2 text-xs text-brand">{t("chat.listening")}</p>
      ) : null}
      {isTranscribing ? (
        <p className="mt-2 text-xs text-ink-muted">{t("chat.transcribing")}</p>
      ) : null}
      {voiceWarning ? (
        <p className="mt-2 text-xs text-brand-strong">{voiceWarning}</p>
      ) : null}
      {voiceError ? (
        <p className="mt-2 text-xs text-danger">{voiceError}</p>
      ) : null}
    </div>
  );
}
