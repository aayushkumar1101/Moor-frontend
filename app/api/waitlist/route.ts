import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

    // Define the data directory path
    const dataDir = path.join(process.cwd(), "data", "waitlist");
    const filePath = path.join(dataDir, "emails.json");

    // Ensure the directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
    }

    // Read existing data or initialize empty array
    let emails: Array<{ email: string; timestamp: string }> = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      emails = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      console.log("Creating new waitlist file");
    }

    // Check if email already exists
    const emailExists = emails.some((entry) => entry.email === email);
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Add new email with timestamp
    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
    };
    emails.push(newEntry);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(emails, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Successfully joined waitlist", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing waitlist submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

