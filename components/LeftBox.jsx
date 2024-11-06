import { useState, useEffect } from 'react';
import GraphComponent from './GraphComponent';
import States from './States';
import data from '../us_data.json';  // Importing us_data.json

const LeftBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false);
  const [stateData, setStateData] = useState([]);

  // Load and process state data on mount
  useEffect(() => {
    // Group data by state to get the top disease by total cases
    const aggregatedData = data.reduce((acc, { state, disease, day28, total }) => {
      if (!acc[state] || acc[state].total < total) {
        acc[state] = { state, disease, day28, total };
        
      }
      return acc;
    }, {});
    

    // Sort by total cases in descending order and limit to the top 8 states
    const sortedData = Object.values(data)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    setStateData(sortedData);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleData = () => {
    setIsWeekly(!isWeekly);
  };

  return (
    <>
      {/* Right Arrow Button */}
      <button
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r-md ${isVisible ? 'z-20' : 'z-0'}`}
        onClick={toggleVisibility}
      >
        {isVisible ? '►' : '◄'}
      </button>

      {/* Pink Box */}
      {isVisible && (
  <div className="absolute top-0 left-0 w-[20%] mt-32 h-[calc(100vh-8rem)] z-20 ">
          <div className="">
            <div className="h-[96%] bg-white overflow-y-scroll bg-red-300">
        

              {/* States Components */}
              <div className ="flex flex-col bg-blue-300">
                <div className='flex w-full text-center  justify-center text-xl my-2 text-gray-700 font-bold'> Diesease By State</div>
                <hr className="border-t-1 border-blue-950 rounded-full" />
                {stateData.map((stateItem) => (
                  <div key={`${stateItem.state}-${stateItem.disease}`}>
                    <States
                      state={stateItem.state}
                      disease={stateItem.disease}
                      day28={stateItem.day28}
                      total={stateItem.total}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[4%]">
              <button
                onClick={toggleData}
                className={`px-4 py-2 text-white ${isWeekly ? 'bg-blue-500' : 'bg-gray-500'}`}
              >
                Largest
              </button>
              <button
                onClick={toggleData}
                className={`px-4 py-2 text-white ${!isWeekly ? 'bg-blue-500' : 'bg-gray-500'}`}
              >
                Alphabetic
              </button>
            </div>
          </div>
         
          <button
            className="absolute top-2 left-2 text-black my-2"
            onClick={toggleVisibility}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default LeftBox;
