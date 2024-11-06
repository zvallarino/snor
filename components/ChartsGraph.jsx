import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { parse } from 'date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsGraph = ({ diseaseData }) => {
  
  // State variables
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState(['All']);

  // Time filter state variables
  const [startDate, setStartDate] = useState(null); // Applied start date
  const [endDate, setEndDate] = useState(null); // Applied end date

  // Temporary time filter state variables for inputs
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  // New state variable for x-axis maximum date
  const [xAxisMaxDate, setXAxisMaxDate] = useState(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle 'All' selection
  const handleSelectAll = () => {
    if (selectedDiseases.includes('All')) {
      setSelectedDiseases([]); // Deselect all
    } else {
      setSelectedDiseases(['All']); // Select all
    }
  };

  // Function to handle individual disease selection
  const handleDiseaseChange = (disease) => {
    if (selectedDiseases.includes(disease)) {
      const newSelection = selectedDiseases.filter((d) => d !== disease);
      if (newSelection.length === 0) {
        setSelectedDiseases(['All']);
      } else {
        setSelectedDiseases(newSelection);
      }
    } else {
      const newSelection = selectedDiseases
        .filter((d) => d !== 'All')
        .concat(disease);
      setSelectedDiseases(newSelection);
    }
  };

  // Function to parse 'Month Year' strings into Date objects
  const parseDate = (dateString) => {
    return parse(dateString, 'MMMM yyyy', new Date());
  };

  // Function to parse 'YYYY-MM' strings from month input
  const parseMonth = (monthString) => {
    const [year, month] = monthString.split('-').map(Number);
    return new Date(year, month - 1, 1); // JavaScript months are zero-based
  };

  // Function to get the last day of a month
  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // Day 0 is the last day of the previous month
  };

  // Extract unique diseases
  const diseases = Array.from(
    new Set(diseaseData.map((item) => item.Disease))
  );

  // Generate colors for diseases
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Map diseases to colors
  const [diseaseColors] = useState(() => {
    const colors = {};
    diseases.forEach((disease) => {
      colors[disease] = getRandomColor();
    });
    return colors;
  });

  // Extract and sort unique dates
  const dates = Array.from(
    new Set(diseaseData.map((item) => parseDate(item.Date).getTime()))
  )
    .sort((a, b) => a - b)
    .map((timestamp) => new Date(timestamp));

  // Parse applied start and end dates
  const parsedStartDate = startDate ? parseMonth(startDate) : null;
  let parsedEndDate = endDate ? parseMonth(endDate) : null;

  // Adjust parsedEndDate to the end of the selected month
  if (parsedEndDate) {
    const year = parsedEndDate.getFullYear();
    const month = parsedEndDate.getMonth() + 1; // Month for getLastDayOfMonth
    const lastDay = getLastDayOfMonth(year, month);
    parsedEndDate = new Date(year, parsedEndDate.getMonth(), lastDay, 23, 59, 59, 999);
  }

  // Adjust xAxisMaxDate to the end of the year
  let actualEndDate = xAxisMaxDate || parsedEndDate;
  if (xAxisMaxDate) {
    actualEndDate = new Date(xAxisMaxDate.getFullYear(), xAxisMaxDate.getMonth(), xAxisMaxDate.getDate(), 23, 59, 59, 999);
  }

  // Filter disease data based on applied date range
  const filteredDiseaseData = diseaseData.filter((item) => {
    const itemDate = parseDate(item.Date);
    const afterStart = parsedStartDate ? itemDate >= parsedStartDate : true;
    const beforeEnd = actualEndDate ? itemDate <= actualEndDate : true;
    return afterStart && beforeEnd;
  });

  // Filter diseases based on selection
  const filteredDiseases = selectedDiseases.includes('All')
    ? diseases
    : selectedDiseases;

  // Prepare datasets for each disease
  const datasets = filteredDiseases.map((disease) => {
    const data = dates
      .filter((date) => {
        // Only include dates within the filtered range
        const afterStart = parsedStartDate ? date >= parsedStartDate : true;
        const beforeEnd = actualEndDate ? date <= actualEndDate : true;
        return afterStart && beforeEnd;
      })
      .map((date) => {
        const record = filteredDiseaseData.find(
          (item) =>
            item.Disease === disease &&
            parseDate(item.Date).getTime() === date.getTime()
        );
        return {
          x: date,
          y: record ? record.Count : 0,
        };
      });

    const color = diseaseColors[disease];

    return {
      label: disease,
      data: data,
      fill: false,
      backgroundColor: color,
      borderColor: color,
      tension: 0.1, // Smooth curves
    };
  });

  // Chart data configuration (no labels needed)
  const data = {
    datasets: datasets,
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust to container size
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      title: {
        display: true,
        text: 'Disease Counts Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'MMM yyyy',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
        max: actualEndDate,
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
    },
  };

  // Function to handle time filter submission
  const handleTimeFilterSubmit = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  return (
    <div className="flex flex-col w-full h-full ">
    <div className='flex w-full items-center text-center justify-center text-4xl my-2 text-blue-950 '>Diease Timeline Graphs</div>
    <div className='flex w-full  h-[90%]'>
      <div  className="flex w-1/6 ">
      <div className='flex w-full  items-center justify-center text-center'>
       <hr className="border-t-2 mb-2 border-blue-950 rounded-full" />

        <div className='flex flex-col'>
        <div className = 'text-gray-700 text-xl'>Filter</div>
        <hr className="border-t-2 mb-2 border-blue-950 rounded-full" />

        {/* Disease Selection Dropdown */}
<div className="relative inline-block text-left mb-4 text-black">
<button
     onClick={toggleDropdown}
     className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
   >
     Select Diseases
   </button>

   {/* Dropdown Menu */}
   {showDropdown && (
     <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
       <div className="py-1">
         {/* "All" Checkbox */}
         <label className="flex items-center px-4 py-2">
           <input
             type="checkbox"
             className="mr-2"
             checked={selectedDiseases.includes('All')}
             onChange={handleSelectAll}
           />
           All
         </label>
         {/* Scrollable List of Diseases */}
         <div className="max-h-60 overflow-y-auto">
           {diseases.map((disease) => (
             <label
               key={disease}
               className="flex items-center px-4 py-2"
             >
               <input
                 type="checkbox"
                 className="mr-2"
                 checked={
                   selectedDiseases.includes('All') ||
                   selectedDiseases.includes(disease)
                 }
                 onChange={() => handleDiseaseChange(disease)}
               />
               <span
                 className="inline-block w-3 h-3 mr-2"
                 style={{ backgroundColor: diseaseColors[disease] }}
               ></span>
               {disease}
             </label>
           ))}
         </div>
       </div>
     </div>
   )}
 </div>
 <hr className="border-t-2 mb-2 border-blue-950 rounded-full" />

           {/* Time Filter */}
 <div className="flex flex-col md:items-end md:space-x-4 mb-4 justify-center">
   {/* Start Date Selection */}
      <div className="mb-4 md:mb-0">
     <label className="block text-sm font-medium text-gray-700 mb-1">
      Start Month
   </label>
   <input 
       type="month"
       className="block w-full border-gray-300 rounded-md text-gray-800 px-2"
       value={tempStartDate || ''}
       onChange={(e) => setTempStartDate(e.target.value)}
     />
   </div>

   {/* End Date Selection */}
   <div className="mb-4 md:mb-0">
     <label className="block text-sm font-medium text-gray-700  mb-1">
       End Month
     </label>
     <input
       type="month"
       className="block w-full border-gray-300 text-gray-800 px-2 rounded-md"
       value={tempEndDate || ''}
       onChange={(e) => setTempEndDate(e.target.value)}
     />
   </div>

   {/* Submit Button */}
   <div className ="flex w-full justify-center my-2">
     <button
       onClick={handleTimeFilterSubmit}
       className="flex justify-center rounded-md border border-transparent bg-blue-600 text-white px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none"
     >
       Submit
     </button>
   </div>



 </div>

 <hr className="border-t-2 mb-2 border-blue-950 rounded-full" />

 <div className="flex flex-col space-x-4 mb-4">
    <div className='flex w-full items-center justify-center mb-2'>
      <button
       onClick={() =>
         setXAxisMaxDate(new Date(2023, 11, 31, 23, 59, 59, 999))
       }
       className="inline-flex mr-2 justify-center rounded-md border border-transparent bg-green-500 text-white px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none"
     >
       2023
     </button>
     <button
       onClick={() =>
         setXAxisMaxDate(new Date(2024, 11, 31, 23, 59, 59, 999))
       }
       className="inline-flex justify-center rounded-md border border-transparent bg-green-500 text-white px-4 py-1 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none"
     >
       2024
     </button>
    </div>
      <div className='flex w-full items-center justify-center pr-6'>
          <button
            onClick={() => setXAxisMaxDate(null)}
            className="flex justify-center rounded-md border border-transparent bg-gray-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-700 focus:outline-none"
          >
            Reset
          </button>
      </div>
 </div>
          
        </div>
        
      </div></div>
    <div className="flex flex-col w-full h-[100%] overflow-y-auto">
  <Line data={data} options={options} />
</div>
<div  className="flex w-1/6 "></div>

      
    </div>
    <div className = 'flex flex-col w-full '> 
      <div className='text-4xl text-center my-2 text-blue-950'>Recent Activity</div>
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
          <div className="bg-gray-100 w-full border-gray-200 border-2 rounded-md p-4 my-4">
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
  );
};

export default ChartsGraph;

