import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [userLang, setUserLang] = useState('eng');

  const playAudio = (symbol) => {
    const audioPath = symbol.audio?.[userLang]?.default || symbol.audio?.eng?.default;
    if (audioPath) {
      const audio = new Audio(`/api/symbols/audio?filename=${encodeURIComponent(audioPath)}`);
      audio.play();
    }
  };

  const addSymbol = (symbol) => {
    setSelectedSymbols(prev => [...prev, symbol]);
    playAudio(symbol);
  };

  const removeSymbol = (indexToRemove) => setSelectedSymbols(prev => prev.filter((_, i) => i !== indexToRemove));

  const openFullscreen = () => setFullscreenActive(true);
  const closeFullscreen = () => setFullscreenActive(false);

  const playSequence = () => {
    setFullscreenActive(true);
  };

  return (
    <AppStateContext.Provider value={{
      selectedSymbols,
      addSymbol,
      removeSymbol,
      playAudio,
      openFullscreen,
      closeFullscreen,
      fullscreenActive,
      playSequence,
      userLang,
      setUserLang,
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext); 