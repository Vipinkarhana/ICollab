import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../../../services/adminService";
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
    retentionRate: 0,
    pageViews: [],
    postGrowth: [],
    deviceUsage: {},
    browserUsage: {},
    pageViewsPerPage: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchAnalytics();
        console.log("Fetched analytics:", data);

        // Convert pageViewsPerPageDaily object into array format
        const pageViewsArray = Object.entries(
          data.pageViewsPerPageDaily || {}
        ).map(([page, views]) => ({
          page,
          views,
        }));

        const pageViewsPerPage = {};
        pageViewsArray.forEach(({ page, views }) => {
          const total = views.reduce((sum, v) => sum + v.value, 0);
          pageViewsPerPage[page] = total;
        });

        setStats({
          ...data,
          pageViews: pageViewsArray,
          pageViewsPerPage,
        });

        setSelectedPage(pageViewsArray[0]?.page || "");
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(true);
        setStats((prev) => ({
          ...prev,
          pageViews: [],
          postGrowth: [],
          deviceUsage: {},
          browserUsage: {},
        }));
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 100000);
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

      {/* Dropdown to Select Page */}
      {stats.pageViews?.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            Select Page for Views
          </label>
          <select
            className="p-2 border border-gray-300 rounded w-full max-w-xs"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {stats.pageViews.map((entry) => {
              const cleanedName =
                entry.page === "/"
                  ? "Dashboard"
                  : entry.page
                      .replace("/", "")
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase());

              return (
                <option key={entry.page} value={entry.page}>
                  {cleanedName}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Line Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title={`Views for "${selectedPage}" Page`}
          data={
            stats.pageViews.find((p) => p.page === selectedPage)?.views || []
          }          
          label="Views"
          color="rgba(255, 206, 86, 0.6)"
        />
        <ChartCard
          title="Post Growth"
          data={stats.postGrowth || []}
          label="Posts per Day"
          color="rgba(54, 162, 235, 0.6)"
        />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <PieChart title="Device Usage" data={stats.deviceUsage} />
        <PieChart title="Browser Usage" data={stats.browserUsage} />
      </div>
    </div>
  );
};

export default Analytics;
