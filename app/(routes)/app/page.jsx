"use client";

import React, { useState, useEffect } from 'react';
import TopLine from '../../components/app/TopLine';
import PecsGrid from '../../components/app/PecsGrid';
import AppHeader from '../../components/app/AppHeader';
import { useRouter } from 'next/navigation'; 

export default function HomePage() {
  const [pecs, setPecs] = useState([]);
  const [selectedPECs, setSelectedPECs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);

  const router = useRouter(); 

  useEffect(() => {
    fetch('/api/pecs')
      .then((response) => response.json())
      .then((data) => {
        setPecs(data);
        setIsLoading(false); // Data is now loaded
      })
      .catch((error) => {
        console.error('Error fetching PECs:', error);
        setIsLoading(false); // Even in case of error, stop loading
      });
  }, []);

  // Check for PECs in history state when component mounts
  useEffect(() => {
    const handlePopState = (event) => {
      console.log('Popstate event:', event.state);
      if (event.state && event.state.pecs) {
        console.log('Setting PECs from history:', event.state.pecs);
        setSelectedPECs(event.state.pecs);
      }
    };

    // Add event listener for popstate
    window.addEventListener('popstate', handlePopState);

    // Check initial history state
    const currentState = window.history.state;
    console.log('Initial history state:', currentState);
    if (currentState && currentState.pecs) {
      console.log('Setting initial PECs from history:', currentState.pecs);
      setSelectedPECs(currentState.pecs);
    }

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Add a useEffect to handle direct navigation to home page
  useEffect(() => {
    // Check if we're coming from the playback page
    const searchParams = new URLSearchParams(window.location.search);
    const pecsParam = searchParams.get('pecs');
    
    if (pecsParam) {
      try {
        const pecs = JSON.parse(decodeURIComponent(pecsParam));
        console.log('Setting PECs from URL:', pecs);
        setSelectedPECs(pecs);
        // Clear the URL parameter
        window.history.replaceState({ pecs }, '', '/');
      } catch (error) {
        console.error('Error parsing PECs from URL:', error);
      }
    }
  }, []);

  // Add a useEffect to log selectedPECs changes
  useEffect(() => {
    console.log('Selected PECs updated:', selectedPECs);
  }, [selectedPECs]);

  const handleClearTopLine = () => {
    setSelectedPECs([]);
  };
  
  const handleAddToTopLine = async (pec) => {
    // If pec is an array, add all PECs at once
    if (Array.isArray(pec)) {
      setSelectedPECs(prevPECs => [...prevPECs, ...pec]);
      // Only play audio if speech recognition is not active
      if (!isSpeechRecognitionActive) {
        for (const p of pec) {
          const audio = new Audio(`/audio/${p.replace('.svg', '.mp3')}`);
          await new Promise((resolve) => {
            audio.onended = resolve;
            audio.play();
          });
        }
      }
    } else {
      // If pec is a single string, add it normally
      setSelectedPECs(prevPECs => [...prevPECs, pec]);
      // Only play audio if speech recognition is not active
      if (!isSpeechRecognitionActive) {
        const audio = new Audio(`/audio/${pec.replace('.svg', '.mp3')}`);
        audio.play();
      }
    }
  };

  const handlePlaySentence = () => {
    if (selectedPECs.length === 0) return;

    // Store current state before navigation
    const state = { pecs: selectedPECs };
    window.history.pushState(state, '', window.location.href);

    // Encode the selectedPECs array as a string to pass in the URL
    const pecsString = encodeURIComponent(JSON.stringify(selectedPECs));

    // Redirect to the playback page with the PECs array in the query
    router.push(`/playback?pecs=${pecsString}`);
  };

  const filteredPECs = pecs.filter((pec) =>
    pec.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state until PECs are fetched
  }

  return (
    <div className="bg-slate-300 px-7 py-[60px] min-h-screen">
      <AppHeader />
      {/* Main Content */}
      <div>
        <TopLine 
          selectedPECs={selectedPECs}
          handleClearTopLine={handleClearTopLine}
          handlePlaySentence={handlePlaySentence}
          handleAddToTopLine={handleAddToTopLine}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          pecs={pecs}
          isSpeechRecognitionActive={isSpeechRecognitionActive}
          setIsSpeechRecognitionActive={setIsSpeechRecognitionActive}
        />
        {/* PECs Grid */}
        <PecsGrid 
          handleAddToTopLine={handleAddToTopLine}
          filteredPECs={filteredPECs}
          pecs={pecs}
        />      
      </div>
    </div>
  );
} 