// GraphComponent.js
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent2 = ({ yLabel, dataPoints, xLabels }) => {
    const data = {
        labels: xLabels,
        datasets: [
          {
            label: yLabel,
            data: dataPoints,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.2, // Added for smoother lines
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: yLabel },
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: yLabel } },
          x: { title: { display: true, text: 'Months' } },
        },
      };
    
      return (
        <div className="h-72 flex "> {/* Adjusted height class to 'h-96' */}
          <Line data={data} options={options} />
        </div>
      );
    };
    

export default GraphComponent2;