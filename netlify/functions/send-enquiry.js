/**
 * Netlify Function - Send Enquiry via Web3Forms
 * This is a fallback function if frontend-to-backend communication fails
 * Prefers backend API for primary email sending
 */

async function sendViaWeb3Forms(emailData) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('Web3Forms API key not configured');
  }

  const payload = {
    access_key: accessKey,
    subject: emailData.subject,
    from_name: emailData.from_name,
    from_email: emailData.from_email,
    to_email: emailData.to_email,
    message: emailData.message,
  };

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to send email via Web3Forms');
  }

  return await response.json();
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
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

    const adminEmail = process.env.ADMIN_EMAIL || 'navinbusinessgupta@gmail.com';

    // Send email to ADMIN
    await sendViaWeb3Forms({
      to_email: adminEmail,
      subject: '📩 New Photography Enquiry - Gupta Album',
      from_name: name,
      from_email: email,
      message: `
New Enquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Photographer: ${photographerName || 'General Enquiry'}

Message:
${message}

---
Please respond to this enquiry at your earliest convenience.
      `,
    });

    // Send email to PHOTOGRAPHER (if selected)
    if (photographerEmail) {
      await sendViaWeb3Forms({
        to_email: photographerEmail,
        subject: '📸 New Client Enquiry - Gupta Album',
        from_name: name,
        from_email: email,
        message: `
You have a new client enquiry:

Client Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Please respond to this enquiry as soon as possible.
      `,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Enquiry sent successfully!',
      }),
    };
  } catch (error) {
    console.error('Send enquiry error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to send enquiry',
      }),
    };
  }
}
