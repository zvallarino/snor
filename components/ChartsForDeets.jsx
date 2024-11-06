// ChartsGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { parse } from 'date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const ChartsForDeets = ({ diseaseData, selectedGraph, timeFilter }) => {
  // Function to parse 'Month Year' strings into Date objects
  const parseDate = (dateString) => {
    return parse(dateString, 'MMMM yyyy', new Date());
  };

  // Filter diseases based on selection
  const diseases =
    selectedGraph === 'Comparisons'
      ? ['Cases', 'Deaths', 'Hospitalizations']
      : [selectedGraph];

  // Extract unique dates
  const dates = Array.from(
    new Set(diseaseData.map((item) => parseDate(item.Date).getTime()))
  )
    .sort((a, b) => a - b)
    .map((timestamp) => new Date(timestamp));

  // Time filter logic
  let filteredDiseaseData = diseaseData;
  if (timeFilter === 'Last 90 Days') {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    filteredDiseaseData = diseaseData.filter((item) => {
      const itemDate = parseDate(item.Date);
      return itemDate >= threeMonthsAgo;
    });
  }

  // Prepare datasets for each disease
  const datasets = diseases.map((disease) => {
    const data = filteredDiseaseData
      .filter((item) => item.Disease === disease)
      .map((item) => ({
        x: parseDate(item.Date),
        y: item.Count,
      }));

    const color =
      disease === 'Cases'
        ? 'rgb(255, 99, 132)'
        : disease === 'Deaths'
        ? 'rgb(54, 162, 235)'
        : 'rgb(75, 192, 192)';

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
        display: true, // Show the legend
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
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartsForDeets;
