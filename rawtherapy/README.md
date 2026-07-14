# RawTherapy

## Context

An AI psychotherapy patient simulator for therapist training (Fastify +
TypeScript, Postgres, Redis, an LLM adapter). A few standalone samples
from the backend, picked independently rather than as one connected
walkthrough — some of them reference modules that aren't included here.

## What's here

- `engine/rule-engine.ts` — pure state-transition logic: therapist message
  → applied rules → next trust/stress/openness/mood.
- `llm/adapter.ts` — a small `LlmAdapter` interface with an OpenAI
  implementation (streaming + non-streaming, `AbortController` timeout)
  and a `MockLlmAdapter` used automatically when no API key is
  configured.
- `services/state-cache.ts` — Redis-backed session state cache, a
  per-session lock (`SET NX EX`), and an idempotency-key store.
- `services/conversation-service.ts` — the turn orchestrator: session
  lock, idempotency check, safety analysis (prompt-injection /
  high-risk-language detection), rule engine, prompt build, LLM call,
  persistence.
- `frontend/components/ChatWindow.tsx`, `MessageBubble.tsx`,
  `MessageInput.tsx` — the chat UI: message list, a composer with
  push-to-record voice input and a keyboard shortcut for it, and
  status-aware message bubbles.
- `frontend/hooks/usePatientSpeech.ts` — plays streamed PCM
  text-to-speech audio via the Web Audio API as it arrives, with a
  prebuffer to avoid choppy playback and a browser
  `speechSynthesis` fallback if streaming fails.

## Anonymization

No real API keys, patient data, or `.env` values are part of this folder.
