import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HamburgerMenu from "./Hamburegr";
const Header = ({ id }) => {
  const location = useLocation();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Networks", path: "/network" },
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

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div
        id={id}
        className="fixed w-full px-2 flex items-center z-[1] text-black animate-navbar  border-gray-50"
      >
        <div className="w-11/12 h-full flex items-center justify-between md:justify-start">
          <div className="h-14 w-28 mr-10 ml-3">
            <img src="" alt="Logo" className="h-[100%] w-[100%]" />
          </div>

          <div className="navbar h-full hidden md:flex w-4/6 justify-evenly items-center relative">
            <div
              className="hover-bg hover:h-8 absolute h-8 bg-gray-200 rounded-lg  transition-all duration-300 pointer-events-none"
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
                className={`item rounded-lg w-28 flex justify-center items-center text-gray-500 font-semibold text-lg cursor-pointer relative z-20 ${
                  isActive(item.path)
                    ? "h-[100%] rounded-none"
                    : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-gray-800 text-4xl" onClick={toggleMenu}>
              {isMenuOpen ? "☰" : "☰"}
            </button>
          </div>
        </div>

        {!isMobile && <button className="h-full w-[10%]">value</button>}

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
