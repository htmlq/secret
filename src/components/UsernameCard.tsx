import { useState } from 'react';
import Image from 'next/image';
import { Username } from '@/data/usernames';
import ContactModal from './ContactModal';
export const runtime = 'edge';
interface UsernameCardProps {
  username: Username;
}

export default function UsernameCard({ username }: UsernameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: { telegram?: string; phone?: string }) => {
    console.log('Contact info:', data);
  };

  return (
    <>
      <div className="relative bg-gray-800 rounded-lg p-6 w-52 mx-auto text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 relative">
            <Image src="/snapchat-logo.png" alt="Snapchat" fill className="object-contain" />
          </div>

          <h3 className="text-xl text-white font-medium truncate w-full">{username.username}</h3>

          <span className="text-yellow-500 font-bold text-lg">${username.price}</span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Buy Now
        </button>
      </div>

      <ContactModal
        username={username.username}
        price={username.price}
        features={username.features}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
