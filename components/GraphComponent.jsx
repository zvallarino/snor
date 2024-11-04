import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = ({ isWeekly, setIsWeekly, yLabel, weeklyData, dailyData, xLabels }) => {



  const data = {
    labels: xLabels,
    datasets: [
      {
        label: isWeekly ? `Weekly ${yLabel}` : `Daily ${yLabel}`,
        data: isWeekly ? weeklyData : dailyData,
        backgroundColor: isWeekly ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)',
        borderColor: isWeekly ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: isWeekly ? `Weekly ${yLabel}` : `Daily ${yLabel}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: isWeekly ? `Weekly ${yLabel}` : `Daily ${yLabel}` },
      },
      x: {
        title: { display: true, text: 'Years' },
      },
    },
  };

  return (
    <div className="h-full flex p-4">
 
        <Bar data={data} options={options} />

    </div>
  );
};

export default GraphComponent;
