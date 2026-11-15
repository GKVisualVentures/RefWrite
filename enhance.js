// Vercel serverless function: keeps your Anthropic API key on the server.
// Setup: add ANTHROPIC_API_KEY (required), ALLOWED_ORIGIN and ANTHROPIC_MODEL (optional)
// as environment variables in your Vercel project, then deploy this repo.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { system, prompt } = req.body || {};
  if (!prompt || String(prompt).length > 20000) {
    return res.status(400).json({ error: 'Missing or oversized prompt' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
        max_tokens: 3000,
        system: String(system || '').slice(0, 8000),
        messages: [{ role: 'user', content: String(prompt) }]
      })
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: 'Upstream error', detail: t.slice(0, 300) });
    }
    const j = await r.json();
    const text = (j.content || []).map(c => c.text || '').join('');
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
