/**
 * @file ActivityPage.js
 * @brief Renders the activity page layout with a profile card, activity feed, and additional content section.
 * @details The page consists of three sections:
 *          1. A profile card on the left.
 *          2. The main activity feed in the center.
 *          3. An additional content area (placeholder) on the right.
 * @author ICollab
 * @date 2025-02-20
 */

import React from 'react'
import ProfileCard from '../HomePage/LeftDiv/ProfileCard'
import AllActivity from './AllActivity'

/**
 * @class ActivityPage
 * @brief Component for displaying user activity on the platform.
 * @returns {JSX.Element} A page with a profile section, activity feed, and an additional content box.
 */
function ActivityPage() {
  return (
    <div className= 'h-auto w-[90svw] mt-14 p-2 flex justify-evenly '>
        <div className='w-[20%] h-[100%] flex flex-col justify-start items-center'>
          <ProfileCard/>
        </div>
      <div className='w-[50%] min-h-[85svh] h-auto flex-col justify-start items-center gap-2 py-1 border bg-gray-200 border-gray-400 rounded-md'>
        <AllActivity/>
      </div>
      <div className="h-44 w-[20%] bg-gray-200 border border-gray-400 rounded-md"></div>
    </div>
  )
}

export default ActivityPage
