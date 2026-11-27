const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HTML_ESCAPES = {
  '&': '&#38;',
  '<': '&#60;',
  '>': '&#62;',
  '"': '&#34;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 64 * 1024) {
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const { name, email, message } = body || {};

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, message.',
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!EMAIL_RE.test(trimmedEmail)) {
      return res.status(400).json({
        error: 'Please provide a valid return email address.',
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Email delivery is not configured.',
      });
    }

    const fromAddress =
      process.env.RESEND_FROM_ADDRESS || "Leonardo's Terrace <onboarding@resend.dev>";
    const toAddress = process.env.CONTACT_TO_ADDRESS || 'lqlp0011@gmail.com';

    const subject = `New contact form message from ${trimmedName}`;
    const html = `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #18181b;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px;">New message from Leonardo's Terrace</h2>
        <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p style="margin: 0 0 12px 0;"><strong>Reply-to:</strong> ${escapeHtml(trimmedEmail)}</p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(trimmedMessage)}</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: trimmedEmail,
        subject,
        html,
      }),
    });

    const data = await resendRes.json().catch(() => ({}));
    if (!resendRes.ok) {
      const upstreamError =
        (data && typeof data.message === 'string' && data.message) ||
        (data && typeof data.error === 'string' && data.error) ||
        'Failed to deliver your message.';
      return res.status(resendRes.status || 502).json({ error: upstreamError });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('[api/contact] Failed to send email:', error);
    return res.status(500).json({
      error: 'Something went wrong while delivering your message.',
    });
  }
}
