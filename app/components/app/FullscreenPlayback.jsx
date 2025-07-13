import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppState } from './AppStateContext';
import { X, Repeat } from 'lucide-react';

console.log("FullscreenPlayback rendered");

export default function FullscreenPlayback() {
  const { selectedSymbols, userLang, closeFullscreen } = useAppState();
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Play the sequence of audios in order, showing one symbol at a time
  const playSequence = async () => {
    console.log("playSequence called");
    setPlaying(true);
    for (let i = 0; i < selectedSymbols.length; i++) {
      setCurrentIdx(i);
      await new Promise((resolve) => {
        const symbol = selectedSymbols[i];
        const audioPath = symbol.audio?.[userLang]?.default || symbol.audio?.eng?.default;
        if (audioPath) {
          const audio = new Audio(`/api/symbols/audio?filename=${encodeURIComponent(audioPath)}`);
          audio.onended = resolve;
          audio.play();
        } else {
          setTimeout(resolve, 800); // fallback delay if no audio
        }
      });
    }
    setPlaying(false);
  };

  useEffect(() => {
    console.log("FullscreenPlayback useEffect running");
    if (selectedSymbols.length > 0) {
      playSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show only the current symbol
  const symbol = selectedSymbols[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-300 px-8">
      {/* Close button */}
      <button
        className="absolute top-6 right-6 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        onClick={closeFullscreen}
        style={{ zIndex: 100 }}
        aria-label="Close fullscreen"
      >
        <X className="w-6 h-6" />
      </button>
      {/* Current symbol */}
      {symbol && (
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mb-8">
          <Image
            src={`/api/symbols/image?filename=${encodeURIComponent(symbol.imagePath)}`}
            alt={symbol.words[userLang] || symbol.words.eng}
            width={320}
            height={320}
            className="object-contain w-full h-auto"
            style={{ maxHeight: '60vh' }}
          />
          <div className="text-black text-3xl mt-6 text-center w-full">
            {symbol.words[userLang] || symbol.words.eng}
          </div>
        </div>
      )}
      {/* Repeat button */}
      <button
        className="w-full max-w-md bg-white text-black rounded-lg py-4 flex items-center justify-center text-xl font-semibold shadow-lg"
        onClick={playSequence}
        disabled={playing}
      >
        <Repeat className="w-6 h-6 mr-2" />
        {playing ? 'Playing...' : 'Repeat Sequence'}
      </button>
    </div>
  );
} 