import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

export const StatsCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-4">
      <div style={{ color, fontSize: "1.5rem" }}>{icon}</div>
      <div>
        <h2 className="text-gray-500 text-sm md:text-base">{title}</h2>
        <p className="text-lg md:text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  export const ChartCard = ({ title, data, label, color }) => {
    if (!data?.length) return null;
  
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>
        <Line
          data={{
            labels: data.map((d) => d?.date || ""),
            datasets: [{ label, data: data.map((d) => d?.value || 0), borderColor: color, backgroundColor: color.replace("0.6", "0.2") }],
          }}
        />
      </div>
    );
  };
  
  export const PieChart = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) return null;
  
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>
        <Pie
          data={{
            labels: Object.keys(data),
            datasets: [
              {
                data: Object.values(data),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
              },
            ],
          }}
        />
      </div>
    );
  };
  
  export const Section = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      {children}
    </div>
  );