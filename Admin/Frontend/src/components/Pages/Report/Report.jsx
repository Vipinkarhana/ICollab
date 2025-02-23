import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { backend_url } from "../../../config";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // const response = await fetch(`${backend_url}/api/user`);
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
    <div className="w-[80%] min-h-screen p-6 bg-gray-100 absolute top-0 left-[20%]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📑 Reports</h2>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Sort By:</span>
          <button
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
            className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow hover:bg-gray-50 transition"
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

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
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
                      className={`px-3 py-1 text-sm font-semibold rounded-lg ${
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
                  colSpan="4"
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
  );
};

export default Report;
