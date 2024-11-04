
import { useState } from 'react';
import GraphComponent from './GraphComponent';

const RightBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWeekly, setIsWeekly] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Random data for the graphs
  const weeklyCasesData = [100, 200, 300, 400];
  const dailyCasesData = [10, 15, 8, 20];
  const weeklyDeathsData = [5, 10, 7, 9];
  const dailyDeathsData = [1, 2, 1, 2];
  const weeklyDosesData = [1000, 2000, 1500, 1200];
  const dailyDosesData = [100, 150, 110, 120];
  const xLabelsYears = ['2021', '2022', '2023', '2024'];
  const xLabelsDays = ['October 20', 'October 21', 'October 22', 'October 23'];
  const toggleData = () => {
    setIsWeekly(!isWeekly);
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
          <div className="h-[calc(100%-4rem)] bg-red-400 mt-16">
            <div className="h-[96%] bg-green-400">
            <div className="h-1/3 bg-blue-400">
            <GraphComponent
                  isWeekly = {isWeekly}
                  setIsWeekly = {setIsWeekly}
                  yLabel="Deaths"
                  weeklyData={weeklyDeathsData}
                  dailyData={dailyDeathsData}
                  xLabels={xLabelsYears}
                /> 

</div>
<div className="h-1/3 bg-green-400">

 <GraphComponent
                  isWeekly = {isWeekly}
                  setIsWeekly = {setIsWeekly}
                  yLabel="Deaths"
                  weeklyData={weeklyDeathsData}
                  dailyData={dailyDeathsData}
                  xLabels={xLabelsYears}
                /> 


</div>
<div className="h-1/3 bg-red-400">
<GraphComponent
                  isWeekly = {isWeekly}
                  setIsWeekly = {setIsWeekly}
                  yLabel="Deaths"
                  weeklyData={weeklyDeathsData}
                  dailyData={dailyDeathsData}
                  xLabels={xLabelsYears}
                /> 

</div>
            </div>
            <div className="h-[4%] bg-green-900">
            <button
              onClick={toggleData}
              className={`px-4 py-2 text-white ${isWeekly ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              Weekly
            </button>
            <button
              onClick={toggleData}
              className={`px-4 py-2 text-white ${!isWeekly ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
              Daily
            </button>
        </div>
          </div>
         
          <button
            className="absolute top-2 left-2 text-white"
            onClick={toggleVisibility}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default RightBox;
