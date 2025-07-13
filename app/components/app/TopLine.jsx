import React, { useState } from 'react';
import Image from 'next/image';
import { useAppState } from './AppStateContext';
import ControlPanel from './ControlPanel';
import SearchBar from './SearchBar';

function TopLine() {
  const {
    selectedSymbols,
    removeSymbol,
    playAudio,
    openFullscreen,
    userLang,
  } = useAppState();
  // Removed isListening, isPlayingAudio, and handlePlaySentence

  // Clear TopLine
  const handleClearTopLine = () => {
    selectedSymbols.forEach(removeSymbol);
  };

  // Handle Speech Recognition (placeholder, implement as needed)
  const handleRecord = () => {
    // Implement your speech recognition logic here
    alert('Speech recognition not implemented yet.');
  };

  return (
    <div className="bg-white flex flex-col px-4 py-4 rounded-md min-h-[120px] justify-center" style={{ minHeight: '140px' }}>
      <div className="flex flex-wrap gap-4 w-full items-center h-full">
        {selectedSymbols.map((symbol, index) => (
          <div key={index} className="relative inline-block">
            <Image
              src={`/api/symbols/image?filename=${encodeURIComponent(symbol.imagePath)}`}
              alt={symbol.words[userLang] || symbol.words.eng}
              width={80}
              height={80}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => playAudio(symbol)}
              // onDoubleClick={() => openFullscreen(symbol)}
              style={{ objectFit: 'contain' }}
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              onClick={() => removeSymbol(index)}
              style={{ zIndex: 2 }}
              title="Remove"
            >
              ×
            </button>
            <div className="text-center text-xs mt-1 text-brand-primary">
              {symbol.words[userLang] || symbol.words.eng}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLine;