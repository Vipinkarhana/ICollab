/**
 * @file Filter.js
 * @brief A UI component for filtering content with a dropdown.
 *
 * This component provides a visual separator and a sorting dropdown.
 *
 * @author [Your Name]
 * @date 2025-02-20
 */

import React from 'react'
import Dropdown from './Dropdown'

/**
 * @class Filter
 * @brief Implements a UI filter with a horizontal line and dropdown.
 * 
 * Features:
 * - Displays a **horizontal separator** for UI clarity.
 * - Includes a **Dropdown component** for sorting options.
 */
function Filter() {
  return (
    <div className='flex h-5 w-[99%]  justify-around items-center'>
      <div className="w-[78%] h-auto text-black">
        <hr className=' border-gray-400 border-t-[0.1em]' />
      </div>
      <div className="w-[22%] flex items-center justify-center">
        <Dropdown></Dropdown>
      </div>
    </div>
  )
}

export default Filter
