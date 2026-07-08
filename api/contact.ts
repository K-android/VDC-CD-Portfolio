import nodemailer from "nodemailer";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  if (smtpHost && (smtpHost === "://gmail.com" || smtpHost.includes("gmail.com"))) {
    smtpHost = "smtp.gmail.com";
  }
  const smtpPort = 465; // Force 465
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : undefined;
  
  const receiverEmail = process.env.RECEIVER_EMAIL || "karthikraj.v.nadar@gmail.com";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP configuration is missing in environment variables");
    return res.status(500).json({ error: "Server configuration error. Please check SMTP settings." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send message: " + error.message });
  }
}
