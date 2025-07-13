import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [fullscreenSymbol, setFullscreenSymbol] = useState(null);
  const [userLang, setUserLang] = useState('eng');
  // Add more state as needed (e.g., audio playback, search, etc.)

  const addSymbol = (symbol) => setSelectedSymbols(prev => [...prev, symbol]);
  const removeSymbol = (symbol) => setSelectedSymbols(prev => prev.filter(s => s._id !== symbol._id));
  const playAudio = (symbol) => {
    // Centralized audio logic (can be expanded)
    const audioPath = symbol.audio?.[userLang]?.default || symbol.audio?.eng?.default;
    if (audioPath) {
      const audio = new Audio(`/api/symbols/audio?filename=${encodeURIComponent(audioPath)}`);
      audio.play();
    }
  };
  const openFullscreen = (symbol) => setFullscreenSymbol(symbol);

  return (
    <AppStateContext.Provider value={{
      selectedSymbols,
      addSymbol,
      removeSymbol,
      playAudio,
      openFullscreen,
      fullscreenSymbol,
      userLang,
      setUserLang,
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext); 