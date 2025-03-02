import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const Report = () => {
  const [reports, setReports] = useState([
    {
      post_id: "1234",
      username: "JohnDoe",
      category: "Spam",
      isactive: true,
      Date: "2025-02-20",
    },
    {
      post_id: "5678",
      username: "Alice",
      category: "Inappropriate Content",
      isactive: false,
      Date: "2025-02-18",
    },
    {
      post_id: "9101",
      username: "BobSmith",
      category: "Harassment",
      isactive: true,
      Date: "2025-02-15",
    },
    {
      post_id: "1121",
      username: "Charlie",
      category: "Fake News",
      isactive: false,
      Date: "2025-02-10",
    },
  ]);

  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user`);
        // const data = await response.json();
        // setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const sortedReports = [...reports].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.Date) - new Date(a.Date)
      : new Date(a.Date) - new Date(b.Date);
  });

  return (
    <div className="w-full md:w-[80%] min-h-screen p-4 md:p-6 bg-gray-100 absolute mt-14 top-0 md:left-[20%]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          📑 Reports
        </h2>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-gray-700 text-sm md:text-base">Sort By:</span>
          <button
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
            className="flex items-center gap-2 bg-white border px-3 py-2 text-sm md:text-base rounded-lg shadow hover:bg-gray-50 transition"
          >
            {sortOrder === "newest" ? (
              <>
                <FaSortAmountDown className="text-blue-600" />
                Newest
              </>
            ) : (
              <>
                <FaSortAmountUp className="text-blue-600" />
                Oldest
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Layout for Large Screens */}
      <div className="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-900 text-white text-left">
                <th className="p-3">Username</th>
                <th className="p-3">Post</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.length > 0 ? (
                sortedReports.map((report) => (
                  <tr
                    key={report.post_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-800">{report.username}</td>
                    <td className="p-3 text-gray-800">{report.post_id}</td>
                    <td className="p-3 font-medium text-gray-700 capitalize">
                      {report.category}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs md:text-sm font-semibold rounded-lg ${
                          report.isactive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {report.isactive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(report.Date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-5 text-center text-gray-500 font-medium"
                  >
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Layout for Small Screens */}
      <div className="block md:hidden">
        {sortedReports.length > 0 ? (
          sortedReports.map((report) => (
            <div
              key={report.post_id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-semibold text-gray-700">Username:</span>{" "}
                  {report.username}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Post ID:</span>{" "}
                  {report.post_id}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span>{" "}
                  {report.category}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      report.isactive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {report.isactive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date:</span>{" "}
                  {new Date(report.Date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No reports found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Report;
