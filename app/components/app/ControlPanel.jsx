import React from 'react';
import { Button } from '../shared/ui/button';
import { Play, X, Mic } from 'lucide-react';

export default function ControlPanel({ onPlay, onClear, onRecord, isListening, isPlayingAudio }) {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={onPlay}
        className="flex-1 bg-green-600 hover:bg-green-800 text-white py-4 rounded-lg"
        size="lg"
        disabled={isPlayingAudio}
      >
        <Play className="h-5 w-5" />
      </Button>
      <Button
        onClick={onClear}
        className="flex-1 py-4 rounded-lg bg-red-500 "
        variant="destructive"
        size="lg"
      >
        <X className="h-5 w-5" />
      </Button>
      <Button
        onClick={onRecord}
        className={`flex-1 py-4 rounded-lg bg-slate-50 hover:bg-slate-400 ${isListening ? 'animate-pulse bg-red-500 hover:bg-red-800 text-white' : ''}`}
        // variant={isListening ? 'default' : 'outline'}
        size="lg"
        disabled={isListening}
      >
        <Mic className="h-5 w-5 text-brand-background" />
      </Button>
    </div>
  );
} 