import { useTranslation } from "react-i18next";
import type { ChatMessage, SessionLanguage } from "../types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export function ChatWindow({
  messages,
  onSend,
  loading,
  onRecordingStart,
  therapistVoiceInputEnabled,
  sessionLanguage,
}: {
  messages: ChatMessage[];
  onSend: (msg: string) => void;
  loading: boolean;
  onRecordingStart?: () => void;
  therapistVoiceInputEnabled: boolean;
  sessionLanguage: SessionLanguage;
}) {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-0 grid-rows-[auto_1fr_auto] rounded-panel border border-line bg-surface shadow-panel">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <strong className="tracking-tight text-ink">{t("chat.title")}</strong>
        <span className={loading ? "text-brand" : "text-success"}>
          {loading ? t("common.processing") : t("common.ready")}
        </span>
      </div>
      <div className="flex flex-col gap-3 overflow-auto p-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {messages.length === 0 ? (
          <div className="rounded-lg border border-line bg-surface-muted px-4 py-3 text-ink-muted">
            {t("chat.empty")}
          </div>
        ) : null}
      </div>
      <MessageInput
        onSend={onSend}
        disabled={loading}
        onRecordingStart={onRecordingStart}
        therapistVoiceInputEnabled={therapistVoiceInputEnabled}
        sessionLanguage={sessionLanguage}
      />
    </div>
  );
}
