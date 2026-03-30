import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim();
}

async function sendWithResend(payload: ContactPayload, toEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const subject = `New Portfolio Message from ${payload.name}`;

  const text = [
    "You received a new message from your portfolio form.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      reply_to: payload.email,
      subject,
      text,
    }),
  });

  return response.ok;
}

async function sendWithSmtp(payload: ContactPayload, toEmail: string) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const isGmailUser = Boolean(user && user.toLowerCase().endsWith("@gmail.com"));
  const host = process.env.SMTP_HOST || (isGmailUser ? "smtp.gmail.com" : "");
  const port = Number(process.env.SMTP_PORT || (isGmailUser ? 465 : 587));
  const from = process.env.SMTP_FROM_EMAIL || user;

  if (!host || !user || !pass || !from) return false;

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: toEmail,
    replyTo: payload.email,
    subject: `New Portfolio Message from ${payload.name}`,
    text: [
      "You received a new message from your portfolio form.",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const payload: ContactPayload = {
      name: sanitize(body.name || ""),
      email: sanitize(body.email || ""),
      message: sanitize(body.message || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (payload.message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message is too short." },
        { status: 400 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "azkanabhansauqi@gmail.com";

    const resendSent = await sendWithResend(payload, toEmail);
    if (resendSent) {
      return NextResponse.json({ ok: true });
    }

    const smtpSent = await sendWithSmtp(payload, toEmail);
    if (smtpSent) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured yet. Set RESEND_API_KEY or SMTP env variables.",
      },
      { status: 500 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error. Please try again." },
      { status: 500 },
    );
  }
}
