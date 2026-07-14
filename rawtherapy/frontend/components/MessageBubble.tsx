import { useTranslation } from "react-i18next";
import type { ChatMessage } from "../types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const { t } = useTranslation();

  const tone =
    message.status === "failed"
      ? "self-start border border-danger bg-danger-soft"
      : message.role === "therapist"
        ? "self-end border border-warning/40 bg-warning-soft"
        : "self-start border border-success/35 bg-success/15";

  const statusTone =
    message.status === "failed" ? "text-danger" : "text-ink-muted";

  const statusLabel =
    message.status && message.status !== "complete"
      ? t(`message.status.${message.status}`)
      : null;

  return (
    <div
      className={[
        "max-w-[80%] rounded-lg px-3 py-2 leading-relaxed text-ink",
        tone,
      ].join(" ")}
    >
      <div>{message.content || t("message.placeholder")}</div>
      {statusLabel ? <small className={statusTone}>{statusLabel}</small> : null}
    </div>
  );
}
