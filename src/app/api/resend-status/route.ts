import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { connected: false, message: "RESEND_API_KEY is not set." },
      { status: 200 }
    );
  }

  // Lightweight validation: check the key format (starts with "re_")
  // and that it looks like a proper Resend key
  const isValidFormat = /^re_[a-zA-Z0-9_]+$/.test(apiKey);

  if (!isValidFormat) {
    return NextResponse.json(
      { connected: false, message: "RESEND_API_KEY is set but appears invalid." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { connected: true, message: "Resend API key is configured and ready." },
    { status: 200 }
  );
}