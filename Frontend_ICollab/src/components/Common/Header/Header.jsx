/**
 * @file Header.js
 * @brief Header component for navigation, search, and user authentication controls.
 * @details This component displays the application header, including navigation links,
 *          a search bar, a logout button, and a responsive mobile menu.
 * @author Your Name
 * @date 2025-02-20
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HamburgerMenu from "./Hamburegr";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../Notification";

/**
 * @class Header
 * @brief Navigation header component.
 * @param {Object} props Component properties.
 * @param {string} props.id The ID of the header component.
 */

const Header = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logo = "/icollab.jpeg"; ///< Path to the logo image.
  const location = useLocation(); ///< Retrieves the current route location.
  const currentUser = useSelector((state) => state.user.userData);
  const username = currentUser?.username;
  /**
   * @brief State for hover effect styling.
   * @details Tracks the position, width, and opacity of the hover effect for menu items.
   */

  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  /**
   * @brief State for mobile menu toggle.
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * @brief Determines if the viewport is mobile-sized.
   */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /**
   * @brief List of navigation menu items.
   */
  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "My Networks", path: "/network" },
    { name: "Projects", path: "/project" },
    { name: "Messages", path: "/message" },
    { name: "Incubators", path: "/incubators" },
    { name: "User Profile", path: `/profile/${username}` },
    { name: "Notification"},
  ];

  /**
   * @brief Handles screen resize events to update mobile view state.
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * @brief Handles hover effects on menu items.
   * @param {Event} e Mouse enter event.
   */
  const handleMouseEnter = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const navbarLeft = document
      .querySelector(".navbar")
      .getBoundingClientRect().left;
    setHoverStyle({ left: left - navbarLeft, width: width, opacity: 1 });
  };

  /**
   * @brief Handles mouse leave event to remove hover effect.
   */
  const handleMouseLeave = () => {
    setHoverStyle({ ...hoverStyle, opacity: 0 });
  };

  /**
   * @brief Toggles the mobile menu visibility.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * @brief Handles user logout action.
   */
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  /**
   * @brief Checks if a menu item is currently active.
   * @param {string} path The path to check.
   * @return {boolean} True if the path matches the current route.
   */
  const isActive = (path) => location.pathname === path;
  const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };
  return (
    <div>
      {/* Main Header Container */}
      <div
        id={id}
        className="fixed w-full h-[9%] flex justify-center items-center z-[1000] text-black bg-white shadow-sm"
      >
        <div className="w-11/12 lg:w-[90%] h-[99%] flex items-center justify-between md:justify-evenly md:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="h-14  w-28 lg:h-12 lg:w-28  ml-2 lg:mr-1  lg:-ml-1"
          >
            <img src={Logo} alt="Logo" className="h-[100%] w-[100%]" />
          </Link>
          {/* Search Bar */}
          <div className="w-auto h-full relative flex items-center">
            <svg
              className="absolute left-3 w-5 h-5 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"
              />
            </svg>
            {/* Search Bar */}
            <input
              type="text"
              className="h-10 lg:h-8 rounded-2xl w-11/12 md:w-60 placeholder:text-xl bg-gray-200 pl-10 text-center placeholder-gray-500 outline-none"
              placeholder="Search"
            />
          </div>

          {/* Desktop Navigation Menu */}
          <div className="navbar h-full hidden md:flex w-4/7  justify-center gap-4 items-center relative">
            <div
              className="hover-border absolute h-8 transition-all duration-300 pointer-events-none border-b-2 border-gray-800"
              style={{
                left: hoverStyle.left,
                width: hoverStyle.width,
                opacity: hoverStyle.opacity,
                zIndex: 1,
              }}
            ></div>

            {/* Mobile Menu Component */}
            {menuItems.map((item, index) => {
              if (item.name === "Notification") {
                return <NotificationDropdown key={index} />;
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`item rounded-lg w-auto flex justify-evenly items-center text-gray-500 font-semibold text-lg cursor-pointer relative z-20 ${
                    isActive(item.path) ? "h-[100%] rounded-none" : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {!isMobile &&
            (isAuthenticated() === false ? (
              <Link
                to="/login"
                className="h-10 rounded-md w-[10%] bg-black text-white flex justify-center items-center"
              >
                Login
              </Link>
            ) : (
              <button
                className="h-10 rounded-md w-[10%] bg-black text-white flex justify-center items-center"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ))}
          <div className="md:hidden">
            <button
              className="text-gray-800 text-4xl -mr-5"
              onClick={toggleMenu}
            >
              {isMenuOpen ? "☰" : "☰"}
            </button>
          </div>
        </div>
        {/* Mobile Menu Component */}
        {isMenuOpen && (
          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            menuItems={menuItems}
            toggleMenu={toggleMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
