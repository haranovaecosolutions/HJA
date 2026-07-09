import nodemailer from "nodemailer";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Only POST request is allowed.",
    });
  }

  try {
    const { name, email, phone, service, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        message: "Name, email and message are required.",
      });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing Gmail environment variables");

      return res.status(500).json({
        ok: false,
        message: "Email service is not configured. Please check Vercel environment variables.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword.replace(/\s/g, ""),
      },
    });

    await transporter.sendMail({
      from: `"Hemil Joshi & Associates Website" <${gmailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New Website Enquiry - ${service || "Professional Services"}`,
      text: `
New Website Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "Not Provided"}
Service: ${service || "Not Selected"}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New Website Enquiry</h2>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not Provided")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service || "Not Selected")}</p>

          <hr />

          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>

          <hr />

          <p style="font-size: 12px; color: #6b7280;">
            This enquiry was submitted through Hemil Joshi & Associates website.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      ok: true,
      message: "Thank you. Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("CONTACT_FORM_ERROR:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });

    return res.status(500).json({
      ok: false,
      message: "Email could not be sent. Please check Gmail App Password and Vercel environment variables.",
    });
  }
}