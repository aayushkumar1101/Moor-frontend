import { NextRequest, NextResponse } from "next/server";

const WAITLIST_API_ENDPOINT = (() => {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL;
  if (!raw) {
    return undefined;
  }
  const normalized = raw.trim().replace(/\/$/, "");
  return `${normalized}/api/waitlist`;
})();

const extractMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const data = payload as Record<string, unknown>;
  const keys = ["error", "detail", "message"];

  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0];
    if (typeof first === "string" && first.trim()) {
      return first;
    }
    if (first && typeof first === "object") {
      const nested = extractMessage(first);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!WAITLIST_API_ENDPOINT) {
      return NextResponse.json(
        { error: "API base URL is not configured on the server." },
        { status: 500 }
      );
    }

    const upstreamResponse = await fetch(WAITLIST_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const contentType = upstreamResponse.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    let upstreamData: unknown = null;

    if (isJson) {
      try {
        upstreamData = await upstreamResponse.json();
      } catch (parseError) {
        console.warn("Failed to parse waitlist upstream response as JSON:", parseError);
      }
    } else {
      const text = await upstreamResponse.text();
      upstreamData = text ? { message: text } : null;
    }

    if (!upstreamResponse.ok) {
      const message =
        extractMessage(upstreamData) || "Failed to join waitlist. Please try again.";

      return NextResponse.json(
        {
          error: message,
          status: upstreamResponse.status,
        },
        { status: upstreamResponse.status }
      );
    }

    if (!upstreamData) {
      return NextResponse.json(
        { message: "Successfully joined waitlist" },
        { status: upstreamResponse.status }
      );
    }

    if (isJson && typeof upstreamData === "object") {
      return NextResponse.json(upstreamData as Record<string, unknown>, {
        status: upstreamResponse.status,
      });
    }

    return NextResponse.json(
      { message: extractMessage(upstreamData) || "Successfully joined waitlist" },
      { status: upstreamResponse.status }
    );
  } catch (error) {
    console.error("Error processing waitlist submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
