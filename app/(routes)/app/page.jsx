"use client";

import React from 'react';
import TopLine from '../../components/app/TopLine';
import PecsGrid from '../../components/app/PecsGrid';
import AppHeader from '../../components/app/AppHeader';
import ControlPanel from '../../components/app/ControlPanel';
import SearchBar from '../../components/app/SearchBar';
import FullscreenPlayback from '../../components/app/FullscreenPlayback';
import { useAppState } from '../../components/app/AppStateContext';

export default function HomePage() {
  const { fullscreenActive, openFullscreen } = useAppState();
  // If you want to keep local search state, do so here
  // You can add any other local state or effects as needed

  // ControlPanel handlers (move from TopLine if needed)
  // You may want to move isListening/isPlayingAudio state up here if needed
  // For now, pass empty handlers as placeholders
  const handlePlaySentence = () => {};
  const handleClearTopLine = () => {};
  const handleRecord = () => {};
  const isListening = false;
  const isPlayingAudio = false;

  return (
    <div className="bg-slate-300 px-8 py-[60px] min-h-screen">
      <AppHeader />
      <div className="flex flex-col gap-4">
        <TopLine />
        <ControlPanel
          onPlay={openFullscreen}
          onClear={() => {}}
          onRecord={() => {}}
          isListening={false}
          isPlayingAudio={false}
        />
        <SearchBar />
        <PecsGrid />
      </div>
      {fullscreenActive && <FullscreenPlayback />}
    </div>
  );
} 