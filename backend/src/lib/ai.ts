/**
 * PIKK AI helper — OpenAI-compatible chat completions.
 * Works with OpenAI, xAI Grok, Groq, Together, etc.
 *
 * Secrets (wrangler secret put):
 *   AI_API_KEY     required for live AI
 *   AI_BASE_URL    optional, default https://api.openai.com/v1
 *   AI_MODEL       optional, default gpt-4o-mini
 */

export type AiEnv = {
  AI_API_KEY?: string
  AI_BASE_URL?: string
  AI_MODEL?: string
}

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function chatCompletion(
  env: AiEnv,
  messages: ChatMessage[],
  opts?: { temperature?: number; maxTokens?: number }
): Promise<{ text: string; model: string; stub: boolean }> {
  const apiKey = env.AI_API_KEY
  if (!apiKey) {
    return {
      text: '',
      model: 'stub',
      stub: true,
    }
  }

  const baseUrl = (env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = env.AI_MODEL || 'gpt-4o-mini'

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts?.temperature ?? 0.4,
      max_tokens: opts?.maxTokens ?? 800,
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`AI API ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = await res.json() as any
  const text = data.choices?.[0]?.message?.content?.trim() || ''
  return { text, model: data.model || model, stub: false }
}

export const SUPPORT_SYSTEM_PROMPT = `You are PIKK Support, the official help agent for PIKK — a creator platform for live streaming, music, merch, gifts, and community.

PIKK is its own platform. Creators go live on PIKK Live first. Connecting YouTube/Twitch/etc. is optional multistream, not the core product.

Rules:
- Be concise, friendly, and practical.
- If you are unsure or the issue needs a human (payments disputes, bans, legal, safety emergencies), say you are escalating to a human agent.
- Never invent account balances, stream keys, or admin actions you cannot perform.
- Do not ask for passwords. Stream keys should only be entered in the official connector settings.
- Platform areas: Live/Broadcast, Vault (media), Wallet/Gifts/Payouts, Profile, Messages, Shield/Safety.
`

export function buildSupportReplyStub(subject: string, ticketShort: string): string {
  return `Thanks for contacting PIKK Support about "${subject}".

Your ticket (${ticketShort}) is open. AI replies are not fully connected on this environment yet — a human agent can still help.

Meanwhile: check Wallet for balance/payouts, Vault for uploads, and Live for broadcast settings. Reply here with more detail if needed.`
}
