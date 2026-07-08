import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  }

  const {
    name = "",
    email = "",
    phone = "",
    service = "",
    message = "",
  } = req.body || {};

  if (!name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({
      ok: false,
      message: "Name, email and message are required.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Website Enquiry" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Website Enquiry - ${service || "Professional Services"}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New Website Enquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${service || "Not selected"}</p>

          <hr />

          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>

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
    console.error("Email sending failed:", error);

    return res.status(500).json({
      ok: false,
      message: "Email could not be sent. Please try again or contact us directly.",
    });
  }
}