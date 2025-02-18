import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
      <Link to="/home" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go Home</Link>
    </div>
  );
};

export default Unauthorized;
