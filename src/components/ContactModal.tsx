import { useState } from 'react';
import axios from 'axios';
export const runtime = 'edge';
interface ContactModalProps {
  username: string;
  price: number;
  features: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { telegram?: string; phone?: string }) => void;
}

function generateOrderId() {
  return `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export default function ContactModal({
  username,
  price,
  features,
  isOpen,
  onClose,
}: ContactModalProps) {
  const [telegram, setTelegram] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegram && !phone) return;

    setLoading(true)

    const orderId = generateOrderId();

    try {
      const response = await axios.post('/api/createPayment', {
        amount: price,
        currency: 'USD',
        orderId,
      });

      window.location.href = response.data.invoice_url;
    } catch (error) {
      console.error('Payment creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-[90%] relative">
        <div className="absolute top-4 right-4 bg-gray-700 rounded-lg p-2 text-xs w-36">
          <h4 className="text-yellow-500 font-bold mb-1">Username Info</h4>
          <ul className="text-gray-300 space-y-0.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="material-symbols-outlined text-yellow-500 text-sm mr-1 flex-shrink-0">
                  check_circle
                </span>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-xl text-white font-bold mb-4">Purchase {username}</h2>
        <p className="text-yellow-500 font-bold mb-4">${price}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Telegram Handle</label>
            <input
              type="text"
              value={telegram}
              onChange={e => setTelegram(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1234567890"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="text-sm text-gray-400">At least one contact method is required</div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!telegram && !phone}
              className="flex-1 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Finalize'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
