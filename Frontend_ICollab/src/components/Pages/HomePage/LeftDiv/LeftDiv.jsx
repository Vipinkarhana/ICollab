/**
 * @file LeftDiv.js
 * @brief Displays the left sidebar containing the Profile Card, Progress Card, and My Incubators Card.
 * @details This component is part of the main layout, providing user-related information and progress tracking.
 * @author ICollab
 * @date 2025-02-20
 */

import React from "react";
import ProfileCard from "./ProfileCard";
import ProgressCard from "./ProgressCard";
import MyIncubatorsCard from "./MyIncubatorsCard";

/**
 * @class LeftDiv
 * @brief Component that renders the left sidebar with user-related widgets.
 * @returns {JSX.Element} A sidebar containing the ProfileCard, ProgressCard, and MyIncubatorsCard.
 */
const LeftDiv = () => {
  return (
    <>
      <div className="w-[20%] h-[100%]  flex flex-col justify-start items-center gap-4">
        <ProfileCard />
        <ProgressCard />
        <MyIncubatorsCard/>
      </div>
    </>
  );
}

export default LeftDiv;