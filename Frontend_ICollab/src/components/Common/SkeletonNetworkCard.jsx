import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonNetworkCard = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md border border-gray-300 flex flex-col gap-4 items-center w-96 max-w-xs">
      {/* Profile Image Skeleton */}
      <Skeleton circle height={100} width={100} baseColor="#e5e7eb" className="mb-3" />

      {/* Name and Designation Skeleton */}
      <div className="flex flex-col items-center">
      <Skeleton width={200} height={24} baseColor="#e5e7eb" className="mb-1" />
      <Skeleton width={180} height={24} baseColor="#e5e7eb" className="mb-2" />
      </div>
     

      {/* Read More Button Skeleton (optional) */}
      <Skeleton width={120} height={25} baseColor="#e5e7eb" />
    </div>
  );
};

export default SkeletonNetworkCard;
