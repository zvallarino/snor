'use client';

import { useState } from 'react';

const RightBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Right Arrow Button */}
      <button
        className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r-md ${isVisible ? 'z-20' : 'z-10'}`}
        onClick={toggleVisibility}
      >
        {isVisible ? '►' : '◄'}
      </button>

      {/* Pink Box */}
      {isVisible && (
        <div className="absolute top-0 right-0 w-[20%] h-full bg-pink-500 z-10">
          <button
            className="absolute top-2 left-2 text-white"
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

export default RightBox;
