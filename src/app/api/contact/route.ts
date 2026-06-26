import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend lazily so the route still works when the env var is
// absent during local development / static builds.
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

// Sender address configured via env so it can be swapped between the Resend
// sandbox domain (onboarding@resend.dev) and a verified custom domain without
// code changes.
const FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS ?? "Leonardo's Terrace <onboarding@resend.dev>";

// Recipient (the portfolio owner). Defaults to the address already used by the
// contact section so the form delivers to the right inbox out of the box.
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS ?? "lqlp0011@gmail.com";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Basic email shape check — good enough for a public contact form without
// pulling in a dedicated validation library.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, message } = body;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid return email address." },
        { status: 400 }
      );
    }

    const subject = `New contact form message from ${name}`;
    const html = `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #18181b;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px;">New message from Leonardo's Terrace</h2>
        <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 12px 0;"><strong>Reply-to:</strong> ${escapeHtml(email)}</p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(message)}</p>
      </div>
    `;

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: "Email delivery is not configured." },
        { status: 503 }
      );
    }

    const data = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { error: "Something went wrong while delivering your message." },
      { status: 500 }
    );
  }
}

// Escape using numeric character references built at runtime so the source
// never contains literal HTML entities that a formatter could mangle.
const HTML_ESCAPES: Record<string, string> = {
  "&": "&#38;",
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}
