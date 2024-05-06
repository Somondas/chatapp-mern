import React from "react";
import { Line, Doughnut, Pie } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  plugins,
} from "chart.js";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const LineChart = () => {
  const data = {
    lables: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [1, 2, 32, 21, 12, 11, 12],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChart = () => {
  return <div>dou</div>;
};
export { LineChart, DoughnutChart };
