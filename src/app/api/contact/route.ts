import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log("📩 Received contact form:", { name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.TARGET_EMAIL,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
