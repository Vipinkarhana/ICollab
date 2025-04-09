import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserPlus, FaChartLine, FaGlobe, FaRegNewspaper } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    newPosts: 0,
    pageViews: [],
    postGrowth: [],
    deviceUsage: {},
    browserUsage: {},
    retentionRate: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mockData = {
    totalUsers: 500,
    newUsers: 20,
    activeUsers: 50,
    totalPosts: 2000,
    newPosts: 5,
    retentionRate: 75,
    pageViews: [
      { date: "2025-03-10", value: 120 },
      { date: "2025-03-11", value: 150 },
      { date: "2025-03-12", value: 180 }
    ],
    postGrowth: [
      { date: "2025-03-10", value: 15 },
      { date: "2025-03-11", value: 18 },
      { date: "2025-03-12", value: 22 }
    ],
    deviceUsage: {
      Mobile: 60,
      Desktop: 30,
      Tablet: 10
    },
    browserUsage: {
      Chrome: 55,
      Firefox: 20,
      Edge: 15,
      Safari: 10
    }
  };
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError(false);
        setLoading(true);
  
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/admin/analytics`);
        
        if (res.data) {
          // Merge backend data with mock data (only fill missing fields)
          setStats((prevStats) => ({
            ...mockData,  // Use mock data as base
            ...res.data,  // Override with real data if available
            pageViews: res.data.pageViews?.length ? res.data.pageViews : mockData.pageViews,
            postGrowth: res.data.postGrowth?.length ? res.data.postGrowth : mockData.postGrowth,
            deviceUsage: res.data.deviceUsage ?? mockData.deviceUsage,
            browserUsage: res.data.browserUsage ?? mockData.browserUsage
          }));
        } else {
          setStats(mockData); // If API fails, use full mock data
        }
        
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(true);
        setStats(mockData); // On error, use mock data
      } finally {
        setLoading(false);
      }
    };

    const trackPageView = async () => {
      const sessionKey = "pageViewTracked";
  
      // Check if page view was already tracked in this session
      if (!sessionStorage.getItem(sessionKey)) {
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/admin/analytics/track-page-view`,{
            "page" : "Analytics"
          });
          sessionStorage.setItem(sessionKey, "true"); // Mark as tracked
        } catch (err) {
          console.error("Error tracking page view:", err);
        }
      }
    };
  
    fetchAnalytics();
    trackPageView();
    const interval = setInterval(fetchAnalytics, 20000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="w-full md:w-[80%] min-h-screen mt-14 p-4 md:p-6 bg-gray-100 absolute top-0 md:left-[20%]">
      <h1 className="text-2xl font-bold mb-4">Admin Analytics</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p className="text-red-600">⚠ Backend Not Responding.</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-4">
        <StatsCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="#3B82F6" />
        <StatsCard title="New Users (Today)" value={stats.newUsers} icon={<FaUserPlus />} color="#10B981" />
        <StatsCard title="Active Users (5 min)" value={stats.activeUsers} icon={<FaChartLine />} color="#8B5CF6" />
        <StatsCard title="Total Posts" value={stats.totalPosts} icon={<FaRegNewspaper />} color="#F97316" />
        <StatsCard title="New Posts (Today)" value={stats.newPosts} icon={<FaGlobe />} color="#EF4444" />
        <StatsCard title="User Retention Rate" value={`${stats.retentionRate}%`} icon={<FaUsers />} color="#14B8A6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="Page Views Over Time"
          data={stats.pageViews}
          label="Page Views"
          color="rgba(255, 99, 132, 0.6)"
        />
        <ChartCard
          title="Post Growth"
          data={stats.postGrowth}
          label="Posts per Day"
          color="rgba(54, 162, 235, 0.6)"
        />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <PieChart title="Device Usage" data={stats.deviceUsage} />
        <PieChart title="Browser Usage" data={stats.browserUsage} />
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex items-center gap-4">
    <div style={{ color, fontSize: "1.5rem" }}>{icon}</div>
    <div>
      <h2 className="text-gray-500 text-sm md:text-base">{title}</h2>
      <p className="text-lg md:text-xl font-bold">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, data, label, color }) => {
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

const PieChart = ({ title, data }) => {
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

export default Analytics;
