/**
 * @file BackToTopButton.js
 * @brief A floating button to scroll back to the top of the page.
 * @details This component listens for scroll events and displays a button when the user 
 *          scrolls down. Clicking the button smoothly scrolls the page to the top.
 * @author ICollab
 * @date 2025-02-20
 */

import React, { useState, useEffect } from "react";
import { MoveUp } from "lucide-react";

/**
 * @class BackToTopButton
 * @brief Component for a floating "Back to Top" button.
 * @returns {JSX.Element} A button that appears when the user scrolls down and scrolls the page up when clicked.
 */
  const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  
  /**
   * @brief Toggles the visibility of the back-to-top button.
   * @details Calculates the scroll position as a percentage of total scrollable height.
   *          The button appears when the user scrolls past 1% of the page.
   */
  const toggleVisible = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const winHeight = window.innerHeight;

    const scrollPercentage = (scrollTop / (docHeight - winHeight)) * 100;

    if (scrollPercentage > 1) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

    /**
   * @brief Smoothly scrolls the page to the top.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    /**
   * @brief Attaches a scroll event listener on mount and removes it on unmount.
   */
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 flex justify-center items-center text-2xl bg-slate-100  w-14 h-14  rounded-lg shadow-lg ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 border border-gray-400`}
    >
      <MoveUp color="black"/>
    </button>
  );
};

export default BackToTopButton;
