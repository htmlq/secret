import { ChangeEvent } from 'react';
export const runtime = 'edge';
interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-56 mx-auto mb-8 relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 select-none">
        search
      </span>
      <input
        type="text"
        placeholder="Search usernames"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm"
      />
    </div>
  );
}
