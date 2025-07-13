import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppState } from './AppStateContext';

export default function PecsGrid() {
  const [symbols, setSymbols] = useState([]);
  const { addSymbol } = useAppState();

  useEffect(() => {
    fetch('/api/symbols/default')
      .then(res => res.json())
      .then(data => setSymbols(data));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {symbols.map(symbol => (
        <div
          key={symbol._id}
          className="relative w-full aspect-square"
          style={{ textAlign: 'center' }}
          onClick={() => addSymbol(symbol)}
        >
          <Image
            src={`/api/symbols/image?filename=${encodeURIComponent(symbol.imagePath)}`}
            alt={symbol.words.eng}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 16vw"
          />
          <div className='text-brand-primary text-h4 absolute bottom-2 left-0 w-full text-center'>{symbol.words.eng}</div>
        </div>
      ))}
    </div>
  );
}