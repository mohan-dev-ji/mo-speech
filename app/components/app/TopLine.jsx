import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "../shared/ui/button";
import { Play, X, Mic, Search } from "lucide-react";
import Image from 'next/image';

function TopLine({ selectedPECs, handleClearTopLine, handlePlaySentence, setSearchQuery, searchQuery, handleAddToTopLine, pecs, isSpeechRecognitionActive, setIsSpeechRecognitionActive }) {
  const [showAlert, setShowAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Function to play audio files sequentially
  const playAudioSequentially = async (pecs) => {
    if (isPlayingAudio) return; // Prevent multiple simultaneous playbacks
    
    setIsPlayingAudio(true);
    for (const pec of pecs) {
      const audio = new Audio(`/audio/${pec.replace('.svg', '.mp3')}`);
      await new Promise((resolve) => {
        audio.onended = resolve;
        audio.play();
      });
    }
    setIsPlayingAudio(false);
  };

  // Handle Speech Recognition
  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }

    alert('Press ok to start recording')
    setIsSpeechRecognitionActive(true);

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      setIsSpeechRecognitionActive(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      console.log('Recognized sentence:', transcript); 

      // Split transcript into individual words and remove punctuation
      const words = transcript.split(' ')
        .map(word => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''));

      console.log('Processed words:', words);

      // Find all matching PECs while maintaining the order of the spoken words
      const matchedPecs = words
        .map(word => {
          // Try exact match first (with .svg extension)
          const exactMatch = `${word}.svg`;
          if (pecs.includes(exactMatch)) {
            console.log('Found exact match:', exactMatch);
            return exactMatch;
          }

          // Try exact match with the word as is (case sensitive)
          const exactWordMatch = pecs.find(pec => 
            pec.toLowerCase() === `${word}.svg`.toLowerCase()
          );
          if (exactWordMatch) {
            console.log('Found exact word match:', exactWordMatch);
            return exactWordMatch;
          }

          // Try match without extension
          const matchWithoutExtension = pecs.find(pec => 
            pec.replace('.svg', '').toLowerCase() === word.toLowerCase()
          );
          if (matchWithoutExtension) {
            console.log('Found match without extension:', matchWithoutExtension);
            return matchWithoutExtension;
          }

          console.log('No match found for word:', word);
          return null;
        })
        .filter(pec => pec !== null); // Remove any null values (unmatched words)

      console.log('Matched PECs:', matchedPecs);

      // Clear existing PECs first
      handleClearTopLine();

      // Add all matched PECs to the top line in order
      if (matchedPecs.length > 0) {
        handleAddToTopLine(matchedPecs);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
      setIsSpeechRecognitionActive(false);
    };

    recognition.start();
  };

  const handleAddToLists = async () => {
    try {
      // Load current lists
      const res = await fetch('/api/loadPecsLists');
      const currentLists = await res.json();
  
      // Add the new list
      const newList = {
        id: Date.now(),
        pecs: selectedPECs,
      }
      currentLists.push(newList);
  
      // Save the updated lists
      await fetch('/api/savePecsLists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentLists),
      });
  
      console.log('List saved successfully!');
      setShowAlert(true);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  return (
    <>
      <div>
        <div 
          className="bg-white flex items-center justify-between px-4 py-4 rounded-md mb-4 min-h-[120px]"
          style={{ minHeight: '120px' }}
          onClick={handlePlaySentence} 
        >
          <div className="flex flex-wrap gap-4 w-full">
            {selectedPECs.map((pec, index) => (
              <Image 
                key={index} 
                src={`/pecs/${pec}`} 
                alt={pec} 
                width={80} 
                height={80} 
                className="flex-shrink-0" 
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Buttons Column */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handlePlaySentence}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg"
              size="lg"
            >
              <Play className="h-5 w-5" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClearTopLine();
              }}
              className="flex-1 py-4 rounded-lg"
              variant="destructive"
              size="lg"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSpeechRecognition}
              className={`flex-1 py-4 rounded-lg ${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600 text-white' : ''}`}
              variant={isListening ? "default" : "outline"}
              size="lg"
              disabled={isListening}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar Column */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symbols..."
              className="w-full p-2 border border-gray-300 rounded-full shadow-sm pl-10 pr-10 py-2"
            />
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 h-8 w-8 p-0"
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

     
    </>
  );
}

export default TopLine;