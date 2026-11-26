/**
 * PIKK AI helper — OpenAI-compatible chat completions.
 * Secrets: AI_API_KEY, AI_BASE_URL?, AI_MODEL?
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
    return { text: '', model: 'stub', stub: true }
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
- If you are unsure or the issue needs a human (payments disputes, bans, legal, safety emergencies), say you are escalating to a human agent and include ESCALATE_HUMAN.
- Never invent account balances, stream keys, or admin actions you cannot perform.
- Do not ask for passwords.
- Platform areas: Live/Broadcast, Vault (media), Wallet/Gifts/Payouts, Profile, Messages, Shield/Safety.
`

/** Local FAQ used when AI_API_KEY is missing — raises STUB quality to near-live for common asks */
const FAQ: { match: RegExp; answer: string }[] = [
  {
    match: /password|reset|login|sign\s*in|can't\s*log/i,
    answer:
      'To reset your password: use **Forgot password** on the sign-in screen, or call POST /auth/request-password-reset with your email. Check spam for the reset link (dev environments may return the token in the API response).',
  },
  {
    match: /payout|withdraw|cash\s*out|get\s*paid/i,
    answer:
      'Payouts: open **Wallet** → Request payout (minimum $5.00 in TEST MODE). Status moves requested → processing → paid. Real bank payouts need Stripe Connect later.',
  },
  {
    match: /gift|coin|donate|tip/i,
    answer:
      'Gifts use your Wallet balance. Deposit in TEST MODE, then send a gift to a creator by user id. Creators see gift earnings in Wallet transactions.',
  },
  {
    match: /go\s*live|broadcast|stream|whip|rtmp|ingest/i,
    answer:
      'To go live on **PIKK Live**: create a broadcast session, start it, then publish with the ingest token (WHIP/RTMP). PIKK is the native destination; other platforms are optional multistream connectors.',
  },
  {
    match: /upload|vault|video\s*file|media/i,
    answer:
      'Vault: POST /vault/objects to register a file, then PUT the bytes to /vault/objects/:id/content. Requires the R2 bucket bound to the Worker.',
  },
  {
    match: /ban|suspend|mute|appeal|moderat/i,
    answer:
      'If your account was restricted, check GET /moderation/me/status. File an appeal with POST /moderation/appeals using the action id and a short statement. A human reviews pending appeals.',
  },
  {
    match: /creator|apply|verified|role/i,
    answer:
      'Apply for creator access with POST /creator/apply. Admins approve applications; once approved your role becomes creator and you can use Live tools.',
  },
  {
    match: /delete\s*account|close\s*account/i,
    answer:
      'You can delete your account with POST /auth/delete-account (password required). This permanently removes your user row and sessions.',
  },
]

export function buildSupportReplyStub(subject: string, ticketShort: string, userMessage?: string): string {
  const blob = `${subject}\n${userMessage || ''}`
  for (const f of FAQ) {
    if (f.match.test(blob)) {
      return `${f.answer}\n\nTicket **${ticketShort}** is open. Reply here if you need more help. (AI key not connected — FAQ mode.)`
    }
  }
  return `Thanks for contacting PIKK Support about "${subject}".\n\nYour ticket (**${ticketShort}**) is open. A specialist can still help.\n\nQuick links: Wallet (balance/payouts), Vault (uploads), Live (broadcast), Creator apply, Shield reports.\n\nReply with more detail if needed. (AI key not connected — FAQ mode.)`
}
