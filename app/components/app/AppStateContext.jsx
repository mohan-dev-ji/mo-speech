import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [userLang, setUserLang] = useState('eng');
  const [isListening, setIsListening] = useState(false);
  const [allSymbols, setAllSymbols] = useState([]);

  // Fetch all symbols for matching (not just the default 6)
  useEffect(() => {
    fetch('/api/symbols/default') // Replace with endpoint for all symbols if available
      .then(res => res.json())
      .then(data => setAllSymbols(data));
  }, []);

  const playAudio = (symbol) => {
    const audioPath = symbol.audio?.[userLang]?.default || symbol.audio?.eng?.default;
    if (audioPath) {
      const audio = new Audio(`/api/symbols/audio?filename=${encodeURIComponent(audioPath)}`);
      audio.play();
    }
  };

  const addSymbol = (symbol, playAudioFlag = true) => {
    setSelectedSymbols(prev => [...prev, symbol]);
    if (playAudioFlag) playAudio(symbol);
  };

  const removeSymbol = (indexToRemove) => setSelectedSymbols(prev => prev.filter((_, i) => i !== indexToRemove));

  const clearAllSymbols = () => setSelectedSymbols([]);

  const openFullscreen = () => setFullscreenActive(true);
  const closeFullscreen = () => setFullscreenActive(false);

  const playSequence = () => {
    setFullscreenActive(true);
  };

  // Speech recognition handler
  const handleRecord = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = userLang === 'eng' ? 'en-US' : userLang; // Map as needed
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      const words = transcript.toLowerCase().split(/\s+/);
      // Add symbols in spoken order
      words.forEach(word => {
        const symbol = allSymbols.find(symbol => {
          const symbolWord = (symbol.words?.[userLang] || symbol.words?.eng || '').toLowerCase();
          return symbolWord === word;
        });
        if (symbol) addSymbol(symbol, false);
      });
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };
    recognition.start();
  };

  return (
    <AppStateContext.Provider value={{
      selectedSymbols,
      addSymbol,
      removeSymbol,
      clearAllSymbols,
      playAudio,
      openFullscreen,
      closeFullscreen,
      fullscreenActive,
      playSequence,
      userLang,
      setUserLang,
      handleRecord,
      isListening,
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext); 