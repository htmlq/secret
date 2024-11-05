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
          success_url: redirectUrl,
        },
        {
          headers: {
            'x-api-key': process.env.NOWPAYMENTS_API_KEY, // Store API key in .env.local
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
