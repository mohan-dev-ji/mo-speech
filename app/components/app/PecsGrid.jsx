import Image from 'next/image';

function PecsGrid({ filteredPECs, handleAddToTopLine }) {

  
  return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {filteredPECs.map((pec, index) => (
        <div 
        key={index} 
        className="bg-white p-2 rounded-md"
        onClick={() => handleAddToTopLine(pec)}
        >
          <Image 
            src={`/pecs/${pec}`} 
            alt={pec} 
            width={100}
            height={100}
            className="max-w-full h-auto mx-auto cursor-pointer"
            style={{ objectFit: 'contain' }}
          />
        </div>
      ))}
    </div>
  )
};

export default PecsGrid;