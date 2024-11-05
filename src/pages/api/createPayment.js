// pages/api/createPayment.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, orderId, redirectUrl } = req.body;

    try {
      const response = await axios.post(
        'https://api.nowpayments.io/v1/invoice',
        {
          price_amount: amount,
          price_currency: currency,
          order_id: orderId,
          success_url: process.env.BASE_URL,
          cancel_url: process.env.BASE_URL,
          ipn_callback_url: `${process.env.BASE_URL}/api/paymentCallback`, // Set IPN callback URL
        },
        {
          headers: {
            'x-api-key': process.env.NOWPAYMENTS_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create payment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
