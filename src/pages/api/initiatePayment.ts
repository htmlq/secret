import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Starting initiatePayment API');

  const { username, price } = req.body;

  try {
    const response = await axios.post(
      'https://api.nowpayments.io/v1/payment',
      {
        price_amount: price,
        price_currency: 'USD',
        pay_currency: 'BTC',
        order_id: `purchase_${username}`,
        order_description: `Purchase of ${username}`,
        ipn_callback_url: `${APP_URL}/api/ipn`,
        success_url: `${APP_URL}/success`,
        cancel_url: `${APP_URL}/cancel`,
      },
      {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Payment initiation failed:', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
}
