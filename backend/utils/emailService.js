/**
 * Web3Forms Email Service
 * Sends emails via Web3Forms API without backend infrastructure
 */

const sendEmailViaWeb3Forms = async (emailData) => {
  try {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error('Web3Forms access key not configured');
      return;
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

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    console.log('Email sent successfully via Web3Forms:', result);
    return result;
  } catch (error) {
    console.error('Email service error:', error.message);
    throw error;
  }
};

export default sendEmailViaWeb3Forms;
