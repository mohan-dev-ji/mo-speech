import React, { useState } from 'react';
import Image from 'next/image';
import { useAppState } from './AppStateContext';
import { Search, X } from 'lucide-react';

function SearchBar() {
  const { addSymbol, userLang } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState([]);

  // Placeholder: implement actual search logic as needed
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    // Optionally, fetch search results from API or filter locally
    // setResults(...)
  };

  // Placeholder: implement speech recognition logic
  const handleSpeechRecognition = () => {
    alert('Speech recognition not implemented yet.');
  };

  // Example: handle selecting a result
  const handleSelect = (symbol) => {
    addSymbol(symbol);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Search icon on the left */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search symbols..."
        className="w-full text-p text-brand-background p-2 border border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-400 rounded-full shadow-sm pr-10 pl-10 outline-none"
        style={{ boxSizing: 'border-box' }}
      />
      {/* X icon on the right when typing */}
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {/* Microphone icon (optional, can be moved if needed) */}
      {/*
      <button
        onClick={handleSpeechRecognition}
        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        disabled={isListening}
      >
        <Image src="/icons/microphone.svg" alt="Microphone" width={24} height={24} />
      </button>
      */}
    </div>
  );
}

export default SearchBar;