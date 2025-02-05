import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPostCard = () => {
  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg shadow-md mb-4">
      {/* Skeleton for profile section */}
      <div className="flex items-center mb-2">
        <Skeleton circle width={40} height={40} baseColor="lightgray"/>
        <div className="ml-3">
          <Skeleton width={100} height={14} baseColor="lightgray"/>
          <Skeleton width={150} height={12} />
        </div>
      </div>

      {/* Skeleton for post content */}
      <Skeleton count={3} height={12} className="mb-2" baseColor="lightgray"/>

      {/* Skeleton for media (if any) */}
      <Skeleton height={200} className="w-full rounded-lg" baseColor="lightgray"/>
    </div>
  );
};

export default SkeletonPostCard;
