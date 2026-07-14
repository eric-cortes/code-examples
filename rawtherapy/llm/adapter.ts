import OpenAI from "openai";
import { env } from "../config/env.js";

export type LlmRequest = {
  systemPrompt: string;
  userPrompt: string;
};

export type LlmResponse = {
  patientMessage: string;
  modelProvider: string;
  modelName: string;
};

export interface LlmAdapter {
  generate(request: LlmRequest): Promise<LlmResponse>;
  generateStream(
    request: LlmRequest,
    onToken: (token: string) => void,
  ): Promise<LlmResponse>;
}

function chunkText(text: string, onToken: (token: string) => void) {
  const chunks = text.split(/(\s+)/).filter(Boolean);
  for (const chunk of chunks) onToken(chunk);
}

export class MockLlmAdapter implements LlmAdapter {
  async generate(request: LlmRequest): Promise<LlmResponse> {
    const latestLine =
      request.userPrompt.split("LATEST THERAPIST MESSAGE:\n")[1] ?? "";

    let reply = "I'm not sure where to start... it feels heavy.";
    if (/how do you feel|what feels hardest|tell me more/i.test(latestLine)) {
      reply =
        "It feels like I am carrying weight all day. Even simple things feel exhausting.";
    } else if (/thank you|appreciate/i.test(latestLine)) {
      reply =
        "I guess... hearing that helps a little. I still feel tense though.";
    } else if (/why didn|you should/i.test(latestLine)) {
      reply = "I don't know... this is why I usually don't talk about it.";
    }

    return {
      patientMessage: reply,
      modelProvider: "mock",
      modelName: "mock-v1",
    };
  }

  async generateStream(
    request: LlmRequest,
    onToken: (token: string) => void,
  ): Promise<LlmResponse> {
    const result = await this.generate(request);
    chunkText(result.patientMessage, onToken);
    return result;
  }
}

export class OpenAiAdapter implements LlmAdapter {
  private client: OpenAI;

  constructor(
    private modelName: string,
    apiKey: string,
  ) {
    this.client = new OpenAI({ apiKey });
  }

  async generate(request: LlmRequest): Promise<LlmResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), env.TURN_TIMEOUT_MS);

    try {
      const completion = await this.client.chat.completions.create(
        {
          model: this.modelName,
          temperature: 0.7,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt },
          ],
        },
        { signal: controller.signal },
      );

      const patientMessage = completion.choices[0]?.message?.content?.trim();
      if (!patientMessage) throw new Error("OpenAI returned empty content");

      return {
        patientMessage,
        modelProvider: "openai",
        modelName: this.modelName,
      };
    } finally {
      clearTimeout(timer);
    }
  }

  async generateStream(
    request: LlmRequest,
    onToken: (token: string) => void,
  ): Promise<LlmResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), env.TURN_TIMEOUT_MS);

    try {
      const stream = await this.client.chat.completions.create(
        {
          model: this.modelName,
          temperature: 0.7,
          stream: true,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt },
          ],
        },
        { signal: controller.signal },
      );

      let patientMessage = "";
      for await (const part of stream) {
        const token = part.choices[0]?.delta?.content ?? "";
        if (!token) continue;
        patientMessage += token;
        onToken(token);
      }

      if (!patientMessage.trim())
        throw new Error("OpenAI returned empty streamed content");

      return {
        patientMessage: patientMessage.trim(),
        modelProvider: "openai",
        modelName: this.modelName,
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

export function createLlmAdapter(): LlmAdapter {
  const provider = env.LLM_DEFAULT_PROVIDER;
  const model = env.LLM_DEFAULT_MODEL;

  if (provider === "openai") {
    if (!env.OPENAI_API_KEY) {
      if (env.NODE_ENV !== "production") return new MockLlmAdapter();
      throw new Error(
        "OPENAI_API_KEY is required when LLM_DEFAULT_PROVIDER=openai",
      );
    }
    return new OpenAiAdapter(model, env.OPENAI_API_KEY);
  }

  return new MockLlmAdapter();
}
