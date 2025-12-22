import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const {
      name,
      email,
      phone,
      message,
      photographerName,
      photographerEmail,
    } = JSON.parse(event.body);

    // ✅ Admin email (always goes)
    const adminEmail = "navinbusinessgupta@gmail.com";

    // 📨 Send email to ADMIN
    await resend.emails.send({
      from: "Gupta Album <onboarding@resend.dev>",
      to: adminEmail,
      subject: "📩 New Photography Enquiry",
      html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Photographer:</b> ${photographerName || "General Enquiry"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // 📨 Send email to PHOTOGRAPHER (if selected)
    if (photographerEmail) {
      await resend.emails.send({
        from: "Gupta Album <onboarding@resend.dev>",
        to: photographerEmail,
        subject: "📸 New Client Enquiry from Gupta Album",
        html: `
          <h2>You have a new enquiry</h2>
          <p><b>Client Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Send enquiry error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
}
