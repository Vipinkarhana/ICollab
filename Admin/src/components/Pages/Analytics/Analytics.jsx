import React, { useEffect, useState } from "react";
import { fetchAnalytics, trackPageView } from "../../../services/adminService";
import {
  FaUsers,
  FaUserPlus,
  FaChartLine,
  FaGlobe,
  FaRegNewspaper,
} from "react-icons/fa";
import { StatsCard, PieChart, ChartCard } from "../../Common/Reusable";

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
      { date: "2025-03-12", value: 180 },
    ],
    postGrowth: [
      { date: "2025-03-10", value: 15 },
      { date: "2025-03-11", value: 18 },
      { date: "2025-03-12", value: 22 },
    ],
    deviceUsage: {
      Mobile: 60,
      Desktop: 30,
      Tablet: 10,
    },
    browserUsage: {
      Chrome: 55,
      Firefox: 20,
      Edge: 15,
      Safari: 10,
    },
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchAnalytics();

        setStats({
          ...mockData,
          ...data,
          pageViews: data.pageViews?.length
            ? data.pageViews
            : mockData.pageViews,
          postGrowth: data.postGrowth?.length
            ? data.postGrowth
            : mockData.postGrowth,
          deviceUsage: data.deviceUsage ?? mockData.deviceUsage,
          browserUsage: data.browserUsage ?? mockData.browserUsage,
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(true);
        setStats(mockData);
      } finally {
        setLoading(false);
      }
    };

    const logPageView = async () => {
      const key = "pageViewTracked";
      if (!sessionStorage.getItem(key)) {
        try {
          await trackPageView("Analytics");
          sessionStorage.setItem(key, "true");
        } catch (err) {
          console.error("Error tracking page view:", err);
        }
      }
    };

    loadAnalytics();
    logPageView();
    const interval = setInterval(loadAnalytics, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-[80%] min-h-screen mt-14 p-4 md:p-6 bg-gray-100 absolute top-0 md:left-[20%]">
      <h1 className="text-2xl font-bold mb-4">Admin Analytics</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p className="text-red-600">⚠ Backend Not Responding.</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="#3B82F6"
        />
        <StatsCard
          title="New Users (Today)"
          value={stats.newUsers}
          icon={<FaUserPlus />}
          color="#10B981"
        />
        <StatsCard
          title="Active Users (5 min)"
          value={stats.activeUsers}
          icon={<FaChartLine />}
          color="#8B5CF6"
        />
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FaRegNewspaper />}
          color="#F97316"
        />
        <StatsCard
          title="New Posts (Today)"
          value={stats.newPosts}
          icon={<FaGlobe />}
          color="#EF4444"
        />
        <StatsCard
          title="User Retention Rate"
          value={`${stats.retentionRate}%`}
          icon={<FaUsers />}
          color="#14B8A6"
        />
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

export default Analytics;
