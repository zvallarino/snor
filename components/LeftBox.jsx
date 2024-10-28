'use client';

import { useState } from 'react';

const LeftBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Left Arrow Button */}
      <button
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-l-md z-20 ${isVisible ? 'z-20' : 'z-10'}`}
        onClick={toggleVisibility}
      >
        {isVisible ? '◄' : '►'}
      </button>

      {/* Green Box */}
      {isVisible && (
        <div className="absolute top-0 left-0 w-[20%] h-full bg-green-500 z-10">
          <button
            className="absolute top-2 right-2 text-white z-20"
            onClick={toggleVisibility}
          >
            ✕
          </button>
          {/* Add content here later */}
        </div>
      )}
    </>
  );
};

export default LeftBox;