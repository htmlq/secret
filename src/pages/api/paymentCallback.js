import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { payment_status, order_id } = req.body;

    if (payment_status === 'finished') {
      console.log(`Payment successful for order ID: ${order_id}`);

      return res.status(200).json({ message: 'Payment successful' });
    } else if (payment_status === 'failed') {
      console.log(`Payment failed for order ID: ${order_id}`);

      return res.status(200).json({ message: 'Payment failed' });
    } else {
      return res.status(200).json({ message: 'Payment status updated' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
