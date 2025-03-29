/**
 * @file HamburgerMenu.js
 * @brief Hamburger menu component for mobile navigation.
 * @details This component displays a dropdown menu when activated, allowing users
 *          to navigate through different sections of the application.
 * @param {Object} props Component properties.
 * @param {boolean} props.isMenuOpen Indicates if the menu is currently open.
 * @param {Function} props.toggleMenu Function to toggle menu visibility.
 * @param {Array} props.menuItems List of menu items with `name` and `path`.
 * @returns {JSX.Element} The HamburgerMenu component.
 */

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
const HamburgerMenu = ({ isMenuOpen, toggleMenu, menuItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <>
      {isMenuOpen && (
        <div className="fixed flex-col items-center top-14 right-4 w-56 max-w-sm bg-gray-200 text-gray-600 rounded-lg shadow-lg p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex justify-center py-2 text-xl border-b border-gray-700 last:border-b-0 mb-2"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex justify-center">
            {isAuthenticated() === false ? (
                          <Link
                            to="/login"
                            className="h-10 rounded-md w-[80%] bg-black text-white flex justify-center items-center"
                          >
                            Login
                          </Link>
                        ) : (
                          <button
                            className="h-10 rounded-md w-[90%] bg-black text-white flex justify-center items-center"
                            onClick={handleLogout}
                          >
                            Log Out
                          </button>
                        )}
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
