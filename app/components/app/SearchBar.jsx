import React, { useState } from 'react';
import Image from 'next/image';



function SearchBar({ setSearchQuery, searchQuery, handleAddToTopLine, pecs }) {
  const [isListening, setIsListening] = useState(false);

  // Handle Speech Recognition
  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }

    alert('Press ok to start recording')

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log('Recognized sentence:', transcript); 

      // Split transcript into individual words
      const words = transcript.toLowerCase().split(' ');
      console.log('Recognized words:', words); // Log the words


      // Filter PECs that match any of the words
      const matchedPecs = words
        .map(word => `${word}.svg`)
        .filter(pec => pecs.includes(pec));
      console.log('Matched PECs:', matchedPecs);
      console.log('PECs list:', pecs);

       // Add all matched PECs to Top Line in one go
       if (matchedPecs.length > 0) {
        handleAddToTopLine(matchedPecs);  // Pass the array of matched PECs
      }

      setSearchQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };

    recognition.start();
  };
  return (
      <div className="mb-4">
        <div className='flex items-center'>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search symbols..."
        className="w-full p-2 border border-gray-300 rounded-full shadow-sm pr-10 pl-5"
      />
      {searchQuery && (
        <button
        onClick={() => setSearchQuery("")}
        className="absolute right-20 text-gray-500 pr-10"
        >
          X {/* Unicode character for "X" */}
        </button>
      )}
     
      {/* Microphone Icon */}
      <div className="mt-2 flex items-center pl-10">
        <button
          onClick={handleSpeechRecognition}
          className="text-gray-500 hover:text-gray-700"
          disabled={isListening}
        >
          <Image src="/icons/microphone.svg" alt="Microphone" width={32} height={32} />
        </button>

      </div>
      </div>
      
    </div>
  )
};

export default SearchBar;