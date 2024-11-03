'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import UsernameCard from '@/components/UsernameCard';
import { usernames } from '@/data/usernames';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsernames = usernames.filter(username =>
    username.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-[1024px] mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Snapchat Usernames Marketplace
        </h1>

        <div className="flex flex-col items-center">
          <SearchBar onSearch={setSearchQuery} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {filteredUsernames.map(username => (
              <UsernameCard key={username.username} username={username} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
