import {
  Bell,
  FolderKanban,
  Home,
  MessageSquare,
  Users,
  Sprout,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileDropDown from "../../ProfileDropDown/ProfileDropDown";
import { logoutUser } from "../../../Redux/Slices/UserSlice";
import ProfilePic from "../ProfilePic";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const Logo = "/icollab.jpeg";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, text: "Home", path: "/home" },
    { icon: <Users size={20} />, text: "My Network", path: "/network" },
    { icon: <FolderKanban size={20} />, text: "Projects", path: "/project" },
    { icon: <MessageSquare size={20} />, text: "Messaging", path: "/message" },
    { icon: <Sprout size={20} />, text: "Incubators", path: "/incubators" },
    { icon: <Bell size={20} />, text: "Notifications", path: "#" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const isAuthenticated = () => !!localStorage.getItem("accessToken");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const currentUser = useSelector((state) => state.user.userData);
  const username = currentUser?.username;

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 z-50 h-[64px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-full relative">
        {/* Logo + Search */}
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden md:flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link to={`/profile/${username}`}>
            <ProfilePic className="md:hidden flex w-[2.8rem]  h-[2.8rem] rounded-full" />
          </Link>
          <div className="relative w-56 sm:w-36 md:w-64">
            <svg
              className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-2"
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
              className="w-full pl-9 pr-4 py-2 rounded-md bg-gray-100 text-sm placeholder:text-gray-500 outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Navigation Icons (Desktop Only) */}
        <div className="hidden md:flex absolute left-1/2 ml-28 transform -translate-x-1/2 items-end gap-5 h-full w-auto text-gray-600">
          {menuItems.map(({ icon, text, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={text}
                to={path}
                className={`flex flex-col items-center justify-end text-sm transition duration-200 pb-2 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 border-b-2 border-transparent"
                }`}
              >
                <div>{icon}</div>
                <span className="text-xs mt-1 hidden lg:block">{text}</span>
              </Link>
            );
          })}
          <div className="hidden sm:block -mb-1">
            <ProfileDropDown />
          </div>
        </div>

        {/* Auth + Hamburger (Right) */}
        <div className="flex items-center gap-3">
          {!isMenuOpen &&
            (isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                Login
              </Link>
            ))}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-800 text-3xl" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-md space-y-2">
          {menuItems.map(({ icon, text, path }) => (
            <Link
              key={text}
              to={path}
              onClick={toggleMenu}
              className="flex items-center gap-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {icon}
              <span>{text}</span>
            </Link>
          ))}
          {isAuthenticated() ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded-md"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block px-2 py-2 text-blue-600 hover:bg-gray-100 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
