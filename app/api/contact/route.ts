import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  industry?: unknown;
  inspectionRequirement?: unknown;
  timeline?: unknown;
  plcBrand?: unknown;
  budgetRange?: unknown;
  message?: unknown;
};

const INQUIRY_RECIPIENT = "amitmauryaajm@gmail.com";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function sanitizeInput(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, " ")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = sanitizeInput(payload.name, 100);
  const email = sanitizeInput(payload.email, 254).toLowerCase();
  const company = sanitizeInput(payload.company, 120);
  const industry = sanitizeInput(payload.industry, 120);
  const inspectionRequirement = sanitizeInput(payload.inspectionRequirement, 180);
  const timeline = sanitizeInput(payload.timeline, 80);
  const plcBrand = sanitizeInput(payload.plcBrand, 100);
  const budgetRange = sanitizeInput(payload.budgetRange, 80);
  const message = sanitizeMessage(payload.message, 3000);

  if (!name || !email || !inspectionRequirement) {
    return NextResponse.json(
      { error: "Name, email, and inspection requirement are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Amit Maurya Portfolio <onboarding@resend.dev>";

const text = `Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Industry: ${industry || "Not provided"}
Inspection Requirement: ${inspectionRequirement}
Timeline: ${timeline || "Not provided"}
PLC Brand: ${plcBrand || "Not provided"}
Budget Range: ${budgetRange || "Not provided"}

Additional Details:
${message || "Not provided"}`;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: INQUIRY_RECIPIENT,
      replyTo: email,
      subject: `Inspection Requirement - ${inspectionRequirement}`,
      text
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send your inquiry right now. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your inquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}
