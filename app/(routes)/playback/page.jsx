"use client"; // Ensure this is a client-side component

import React from 'react';
import { Button } from '../../components/shared/ui/button';
import { Play, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PlaybackPage() {
  const router = useRouter();
  const [pecs, setPecs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pecsParam = searchParams.get('pecs');

    if (pecsParam) {
      setPecs(JSON.parse(decodeURIComponent(pecsParam)));
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (isPlaying && pecs.length > 0) {
      const currentPEC = pecs[currentIndex];
      const audio = new Audio(`/audio/${currentPEC.replace('.svg', '.mp3')}`);
      audio.play();

      audio.onended = () => {
        if (currentIndex < pecs.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsPlaying(false); // Stop when all PECs are played
        }
      };
    }
  }, [currentIndex, isPlaying, pecs]);

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const handleGoBack = () => {
    // Store the PECs in history state
    const state = { pecs: pecs };
    // Use replaceState to update the current history entry
    window.history.replaceState(state, '', window.location.href);
    // Go back to the previous page
    router.back();
  };

  return (
    <div className="bg-slate-300 px-7 py-[60px] min-h-screen">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {pecs.length > 0 && (
          <Image
            src={`/pecs/${pecs[currentIndex]}`}
            alt={pecs[currentIndex]}
            width={800}
            height={800}
            className="max-w-full max-h-full w-auto h-auto mb-8"
            style={{ maxWidth: '90vw', maxHeight: '70vh' }}
          />
        )}

        <div className="w-full max-w-[90vw] flex space-x-4">
          <Button
            onClick={handleGoBack}
            className="flex-1 py-4 rounded-lg"
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={handlePlayAgain}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg"
            size="lg"
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
} 