import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectCardSkeleton = () => {
  return (
    <div className="relative w-full sm:min-w-[34rem] sm:h-[20rem] bg-gray-200 p-5 sm:p-6 rounded-xl shadow-md flex flex-col justify-between ">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <Skeleton width={160} height={35} baseColor="lightgray"/>
          {/* <Skeleton  width={100} height={20} baseColor="lightgray"/> */}
        </div>

        <Skeleton  width={20} height={30} baseColor="lightgray"/>
      </div>

      {/* Status + Collaborators */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <Skeleton  width={80} height={18} baseColor="lightgray"/>
          <Skeleton  width={130}baseColor="lightgray" height={28} style={{ borderRadius: "9999px", marginTop: "8px" }} />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} circle width={40} height={40} baseColor="lightgray"/>
            ))}
          </div>
          <Skeleton  width={100} baseColor="lightgray" height={22} />
        </div>
      </div>

      {/* Field, Dates & Button */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm sm:text-base font-medium">
        <Skeleton  width={150} height={35} style={{ borderRadius: "8px" }} baseColor="lightgray"/>
        <Skeleton  width={120} height={20} baseColor="lightgray"/>
        <Skeleton  width={120} height={20} baseColor="lightgray"/>
        <Skeleton  width={80} height={30} style={{ borderRadius: "8px", marginLeft: "auto" }} baseColor="lightgray"/>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
