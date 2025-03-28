// MainDeets.js
import React, { useState } from 'react';
import { GrGraphQl } from 'react-icons/gr';
import MapComponent from './MapComponent';
import ChartsGraph from './ChartsGraph';
import ChartsForDeets from './ChartsForDeets';
import MapForDeets from './MapForDeets';
import { CiViewTimeline } from "react-icons/ci";
import { GrNotes } from "react-icons/gr";
import { GoQuestion } from "react-icons/go";

import { MdSpeakerNotes } from "react-icons/md";
import { FaTimeline } from "react-icons/fa6";
import GraphComponent2 from './GraphComponent2';



function TrendsPage() {
 // State for the timeframes
 const [selectedTimeframe, setSelectedTimeframe] = useState('All Time');

 // State for the graph selection
 const [selectedGraph, setSelectedGraph] = useState('Comparisons');

 // State for the time filter in graphs
 const [timeFilter, setTimeFilter] = useState('All Time');

 // Function to calculate numbers based on timeframe
 const calculateNumber = (baseNumber) => {
   let number;
   if (selectedTimeframe === 'All Time') {
     number = baseNumber;
   } else if (selectedTimeframe === 'Past Day') {
     number = baseNumber / 365 + getRandomNumber();
   } else if (selectedTimeframe === 'Past Week') {
     number = baseNumber / 52 + getRandomNumber();
   } else if (selectedTimeframe === 'Past Month') {
     number = baseNumber / 12 + getRandomNumber();
   }
   return Math.round(number);
 };

 const getRandomNumber = () => Math.floor(Math.random() * 10); // Random number between 0 and 9

 // Generate months for the last 6 months
 const months = [...Array(6).keys()].map((i) => {
   const date = new Date();
   date.setMonth(date.getMonth() - 5 + i);
   return date.toLocaleString('default', { month: 'short' });
 });

 // Generate more variable increasing data
 const generateIncreasingData = () => {
   let value = 50 + Math.floor(Math.random() * 20); // Start with a base value between 50 and 70
   return [...Array(6)].map((_, i) => {
     value += Math.floor(Math.random() * 15) + 5; // Increase by 5 to 19
     return value;
   });
 };

 // Generate more variable decreasing data
 const generateDecreasingData = () => {
   let value = 100 + Math.floor(Math.random() * 20); // Start with a base value between 100 and 120
   return [...Array(6)].map((_, i) => {
     value -= Math.floor(Math.random() * 15) + 5; // Decrease by 5 to 19
     return value > 0 ? value : 0; // Ensure the value doesn't go below 0
   });
 };

 const increasingDiseases = ['Disease A', 'Disease B', 'Disease C', 'Disease D'];
 const decreasingDiseases = ['Disease E', 'Disease F', 'Disease G', 'Disease H'];

 const increasingDataForDisease = {};
 increasingDiseases.forEach((disease) => {
   increasingDataForDisease[disease] = generateIncreasingData();
 });

 const decreasingDataForDisease = {};
 decreasingDiseases.forEach((disease) => {
   decreasingDataForDisease[disease] = generateDecreasingData();
 });

  // Generate random data for the graphs
  const generateRandomData = () => {
    const diseases = ['Cases', 'Deaths', 'Hospitalizations'];
    const months = [...Array(12).keys()].map((i) => {
      const date = new Date();
      date.setMonth(i);
      return date;
    });
    const diseaseData = [];

    diseases.forEach((disease) => {
      months.forEach((month) => {
        diseaseData.push({
          Disease: disease,
          Date: month.toLocaleString('default', { month: 'long', year: 'numeric' }), // Corrected line
          Count: Math.floor(Math.random() * 1000) + 100, // Random number between 100 and 1099
        });
      });
    });

    return diseaseData;
  };

  const diseaseData = generateRandomData();

  return (
    <div className="flex flex-col h-full w-full ">
      {/* Header */}
      <div className="flex w-full justify-between p-4">
        <div className="text-blue-950 text-6xl ">Data Overview</div>
        <div className="flex items-center">
          <span className="mr-2 text-black">SHARE THIS PAGE</span>
          <a href="https://www.facebook.com" className="ml-2">
            <img
              src="/facebook.png"
              alt="Facebook"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="https://www.instagram.com" className="ml-2">
            <img
              src="/instagram.png"
              alt="Instagram"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="https://www.threads.com" className="ml-2">
            <img
              src="/threads.png"
              alt="Threads"
              className="w-6 h-6 rounded-full"
            />
          </a>
          <a href="mailto:example@example.com" className="ml-2">
            <img
              src="/email.png"
              alt="Email"
              className="w-6 h-6 rounded-full"
            />
          </a>
        </div>
      </div>
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      <div className="flex w-full justify-between p-4">
        <div className=" ml-2 text-gray-700">
          Welcome to our data repository. This page serves as a comprehensive resource for accessing raw datasets, analyzing data trends, and consulting the original sources from which the data was obtained.
        </div>
      </div>

      {/* Overview Section */}
      <div className="flex  p-4">
        <div className="flex items-center">
          <GrGraphQl className="text-blue-900 text-4xl" />
          <div className="ml-2 text-2xl font-bold text-blue-900">OVERVIEW</div>
        </div>
      </div>

      {/* 6 Month Increasing Trends */}
      <div className="flex w-full">
        <div className="ml-2 text-2xl font-bold text-blue-900">6 Month Increasing Trends</div>
      </div>

      {/* Place Increasing Graphs Here */}
      <div className="flex w-full flex-wrap">
        {increasingDiseases.map((disease, index) => (
          <div key={index} className="w-[22%]">
            <GraphComponent2
              yLabel={disease}
              dataPoints={increasingDataForDisease[disease]}
              xLabels={months}
            />
          </div>
        ))}
      {/* Plus Button */}
      <div className="flex  h-full justify-center items-center w-[4%]">
        <button className="text-blue-500 bg-slate-300 text-2xl rounded-full h-1/6 w-8 items-center text-center">+</button>
      </div>
        
      </div>

 

      {/* Data Timeline Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      {/* 6 Month Decreasing Trends */}
      <div className="flex w-full">
        <div className="ml-2 text-2xl font-bold text-blue-900">6 Month Decreasing Trends</div>
      </div>

      {/* Place Decreasing Graphs Here */}
      <div className="flex w-full flex-wrap">
        {decreasingDiseases.map((disease, index) => (
          <div key={index} className="w-[22%]">
            <GraphComponent2
              yLabel={disease}
              dataPoints={decreasingDataForDisease[disease]}
              xLabels={months}
            />
          </div>
        ))}
              {/* Plus Button */}
      <div className="flex  h-full justify-center items-center w-[4%]">
        <button className="text-blue-500 bg-slate-300 text-2xl rounded-full h-1/6 w-8 items-center text-center">+</button>
      </div>
      </div>

      {/* Plus Button */}
\
      {/* Data Timeline Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />

      <div className="flex items-center ">
        <FaTimeline className="text-blue-900 text-4xl" />
        <div className="ml-2 text-2xl font-bold text-blue-900">DATA TIMELINE</div>
      </div>
      <div className="flex w-full p-4 text-gray-700">
        Explore the most vital information about how HIV has affected your state since the start of our tracking in January 2020 – cases, deaths, test positivity, hospitalizations, and vaccinations.
      </div>

      {/* Graph Section */}
      <div className="flex w-full">
        <div className="bg-white w-full p-4">
          {/* Graph Selection Buttons */}
          <div className="flex justify-around mb-4">
            {['Comparisons', 'Cases', 'Deaths', 'Hospitalizations'].map(
              (graphType) => (
                <button
                  key={graphType}
                  className={`w-1/4 items-center text-center px-2 py-1 ${
                    selectedGraph === graphType
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-blue-500'
                  } hover:bg-blue-400`}
                  onClick={() => setSelectedGraph(graphType)}
                >
                  {graphType}
                </button>
              )
            )}
          </div>

          {/* Graph Title */}
          <div className="flex w-full  mb-4">
            <h2 className="text-xl text-blue-800">Timeline {selectedGraph}</h2>
          </div>

          {/* Graph and Time Filter */}
          <div className="flex w-full">
            {/* Graph */}
            <div className=" w-[80%] py-8 h-80">
              <ChartsForDeets
                diseaseData={diseaseData}
                selectedGraph={selectedGraph}
                timeFilter={timeFilter}
              />
            </div>

            {/* Time Filter Buttons */}
            <div className=" w-[20%] flex flex-col items-center justify-center">
              {['All Time', 'Last 90 Days'].map((filter) => (
                <button
                  key={filter}
                  className={`w-3/4 items-center text-center px-2 py-1 mb-2 ${
                    timeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-blue-400`}
                  onClick={() => setTimeFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div className="mt-4 text-gray-800">
            Data Sources: Cases and deaths data from JHU CSSE; testing and
            vaccine data from JHU CCI; and hospitalization data from the U.S.
            Department of Health and Human Services.
          </div>
        </div>
      </div>

        {/* Notes Section */}
        <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
      <div className="flex items-center p-4 ">
      <GoQuestion className ="text-blue-950 text-2xl mr-2" />
        <div className="ml-2 text-xl text-2xl font-bold text-blue-900 ">Sources</div>
      </div>
      <div className="flex w-full">
        <div className="w-full p-4">
          {/* Source 1*/}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4">
          <div className="text-blue-800 my-4">World Health Organization (WHO)</div>
  <div className="text-black">
    The World Health Organization is a specialized agency of the United Nations responsible for international public health. It monitors health trends, provides leadership on global health matters, and compiles data on various health topics worldwide.
  </div>
  <div className="text-black my-4">
    <a href="https://www.who.int/" className="text-blue-600 underline">
      Visit Website
    </a>
  </div>
          </div>

          {/* Source 2 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4">
          <div className="text-blue-800 my-4">Centers for Disease Control and Prevention (CDC)</div>
  <div className="text-black">
    The CDC is the national public health agency of the United States. It provides critical information on health threats, disease prevention, and detailed data on various health conditions affecting the U.S. population.
  </div>
  <div className="text-black my-4">
    <a href="https://www.cdc.gov/" className="text-blue-600 underline">
      Visit Website
    </a>
  </div>
          </div>

                  {/* Source 3*/}
            <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4 mt-2">
            <div className="text-blue-800 my-4">Johns Hopkins University</div>
            <div className="text-black">
    Johns Hopkins University provides comprehensive data on global public health, including up-to-date statistics on infectious diseases, health metrics, and epidemiological research through its Coronavirus Resource Center.
  </div>
            <div className="text-black my-4">
            <a href="https://coronavirus.jhu.edu/" className="text-blue-600 underline">
      Visit Website
    </a>
            </div>
          </div>
        </div>

        
      </div>

      {/* Notes Section */}
      <hr className="my-4 border-t-2 border-blue-950 rounded-full" />
      <div className="flex items-center p-4 ">
      <GrNotes className ="text-blue-950 text-2xl mr-2" />
        <div className="ml-2 text-xl text-2xl font-bold text-blue-900 ">NOTES</div>
      </div>
      <div className="flex w-full">
        <div className="w-full p-4">
          {/* Note 1 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 mb-4">
            <div className="text-blue-800 my-4">November 30, 2024</div>
            <div className="text-black">
              Multiple states with reporting interruptions due to Thanksgiving
              holiday: Please see list here:{' '}
              <a
                href="https://github.com/CSSEGISandData/COVID-19/issues/6304"
                className="text-blue-600 underline"
              >
                https://github.com/CSSEGISandData/COVID-19/issues/6304
              </a>
            </div>
            <div className="text-black my-4">
              <a href="#" className="text-blue-600 underline">
                View All Data Notes
              </a>
            </div>
          </div>

          {/* Note 2 */}
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4">
            <div className="text-blue-800 my-4">August 16, 2024</div>
            <div className="text-black">
              Reduced counts in U.S. cases and deaths are the result of states
              and territories not reporting the information for some or all of
              the weekend. Those states and territories are: Alaska, Colorado,
              Connecticut, District of Columbia, Florida, Georgia, Guam, Idaho,
              Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine,
              Massachusetts, Michigan, Minnesota, Mississippi, Montana,
              Nebraska, Nevada, New Hampshire, New Mexico, North Carolina,
              Northern Mariana Islands, Oklahoma, Rhode Island, South Carolina,
              South Dakota, Tennessee, Utah, U.S. Virgin Islands, Virginia,
              Washington, West Virginia, Wisconsin, and Wyoming. Typically,
              these states' Monday updates include the weekend totals.
            </div>
            <div className="text-black my-4">
              <a href="#" className="text-blue-600 underline">
                View All Data Notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendsPage;
