"use client"; 

import React, { useState, useEffect } from 'react';
import TopLine from '../../components/app/TopLine';
import SearchBar from '../../components/app/SearchBar';
import PecsGrid from '../../components/app/PecsGrid';
import { useRouter } from 'next/navigation'; 

function Search() {
  const [pecs, setPecs] = useState([]);
  const [selectedPECs, setSelectedPECs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();  

  const handleClearTopLine = () => {
    setSelectedPECs([]);
  };

  useEffect(() => {
    fetch('/api/pecs')
      .then((response) => response.json())
      .then((data) => setPecs(data))
      .catch((error) => console.error('Error fetching PECs:', error));
      console.log(pecs);
  }, [pecs]);

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

  // Add a useEffect to handle direct navigation to search page
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
        window.history.replaceState({ pecs }, '', '/search');
      } catch (error) {
        console.error('Error parsing PECs from URL:', error);
      }
    }
  }, []);

  // Add a useEffect to log selectedPECs changes
  useEffect(() => {
    console.log('Selected PECs updated:', selectedPECs);
  }, [selectedPECs]);
  
  const handleAddToTopLine = (pecs) => {
    console.log('handleAddToTopLine called with:', pecs);
    // Ensure pecs is an array, even if a single string is passed
    const pecsArray = Array.isArray(pecs) ? pecs : [pecs];
    // Process each item in the array
    pecsArray.forEach((pec) => {
      if (typeof pec === 'string') {
        // Check if the PEC ends with '.svg'
        
        if (!pec.endsWith('.svg')) {
          pec = `${pec}.svg`;
        }
  
        // Add to the selectedPECs state
        setSelectedPECs((prevSelectedPECs) => [...prevSelectedPECs, pec]);

      } else {
        console.error('Invalid PEC type:', pec);
      }
    });
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

  const filteredPECs = searchQuery ? pecs.filter((pec) =>
    pec.toLowerCase().includes(searchQuery.toLowerCase())
  )
  : [];

  return (
    <>
      {/* Main Content */}
      <div>
      <TopLine 
          selectedPECs={selectedPECs}
          handleClearTopLine={handleClearTopLine}
          handlePlaySentence={handlePlaySentence}
        />
      {/* Search Bar */}
      <SearchBar 
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          pecs={pecs}
          handleAddToTopLine={handleAddToTopLine}
      />
      {/* PECs Grid */}
      <PecsGrid 
          handleAddToTopLine={handleAddToTopLine}
          filteredPECs={filteredPECs}
      />
      
      </div>
    </>
  )
};

export default Search; 