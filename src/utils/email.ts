import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_id'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_id'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'public_key'; // Replace with your EmailJS public key

interface EmailParams {
  to_email: string;
  order_reference: string;
  customer_email: string;
  customer_address: string;
  order_details: string;
  total: string;
  timestamp: string;
}

export const sendOrderEmail = async (params: EmailParams): Promise<void> => {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, {
      publicKey: PUBLIC_KEY,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};