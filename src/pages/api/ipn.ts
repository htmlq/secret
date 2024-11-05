import { NextApiRequest, NextApiResponse } from 'next';

export default async function ipnHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { payment_status, order_id, pay_address, amount_received, pay_currency } = req.body;

    if (payment_status === 'finished') {
      console.log(
        `Payment for ${order_id} was successful. Received ${amount_received} ${pay_currency}.`,
      );
    } else {
      console.log(`Payment for ${order_id} is in status: ${payment_status}`);
    }

    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
