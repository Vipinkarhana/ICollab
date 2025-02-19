import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HamburgerMenu from "./Hamburegr";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logo = "/ICollab.jpeg";
  const location = useLocation();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "My Networks", path: "/network" },
    { name: "Projects", path: "/project" },
    { name: "Messages", path: "/message" },
    { name: "Incubators", path: "/incubators" },
    { name: "User Profile", path: "/profile" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const navbarLeft = document
      .querySelector(".navbar")
      .getBoundingClientRect().left;
    setHoverStyle({ left: left - navbarLeft, width: width, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverStyle({ ...hoverStyle, opacity: 0 });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () =>{
    dispatch(logoutUser());
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div
        id={id}
        className="fixed w-full h-[8%] flex justify-center items-center z-[1] text-black bg-white shadow-md"
      >
        <div className="w-11/12 lg:w-[90%] h-[99%] flex items-center justify-between md:justify-evenly md:gap-4">
          <Link to="/" className="h-14  w-28 lg:h-12 lg:w-28  ml-2 lg:mr-1  lg:-ml-1">
            <img src={Logo} alt="Logo" className="h-[100%] w-[100%]" />
          </Link>
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

            <input
              type="text"
              className="h-10 lg:h-8 rounded-2xl w-11/12 md:w-60 placeholder:text-xl bg-gray-200 pl-10 text-center placeholder-gray-500 outline-none"
              placeholder="Search"
            />
          </div>

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

            {menuItems.map((item, index) => (
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
            ))}
          </div>

          {!isMobile && (
            <button to="/incubators" className="h-10 rounded-md w-[10%] bg-black text-white flex justify-center items-center" onClick={handleLogout}>
              Log Out
            </button>
          )}
          <div className="md:hidden">
            <button className="text-gray-800 text-4xl -mr-5" onClick={toggleMenu}>
              {isMenuOpen ? "☰" : "☰"}
            </button>
          </div>
        </div>

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
