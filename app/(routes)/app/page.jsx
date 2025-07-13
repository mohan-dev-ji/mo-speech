"use client";

import React from 'react';
import TopLine from '../../components/app/TopLine';
import PecsGrid from '../../components/app/PecsGrid';
import AppHeader from '../../components/app/AppHeader';
import ControlPanel from '../../components/app/ControlPanel';
import SearchBar from '../../components/app/SearchBar';
import FullscreenPlayback from '../../components/app/FullscreenPlayback';
import { useAppState } from '../../components/app/AppStateContext';
import Lottie from 'lottie-react';
import recordingLottie from '../../components/shared/ui/RecordingAnimation.json';

export default function HomePage() {
  const { fullscreenActive, openFullscreen, clearAllSymbols, handleRecord, isListening } = useAppState();

  return (
    <div className="bg-slate-300 px-8 py-[60px] min-h-screen">
      <AppHeader />
      <div className="flex flex-col gap-4">
        <TopLine />
        <ControlPanel
          onPlay={openFullscreen}
          onClear={clearAllSymbols}
          onRecord={handleRecord}
          isListening={isListening}
          isPlayingAudio={false}
        />
        <SearchBar />
        <PecsGrid />
      </div>
      {fullscreenActive && <FullscreenPlayback />}
      {/* Listening Overlay */}
      {isListening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-64 h-64">
            <Lottie animationData={recordingLottie} loop={true} />
          </div>
          <div className="absolute bottom-16 w-full text-center text-white text-2xl font-semibold">Listening...</div>
        </div>
      )}
    </div>
  );
} 