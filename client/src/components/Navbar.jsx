import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          WebApp
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Profile
          </Link>
          <Button>Sign In</Button>
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Simple hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>
            <Button className="w-full">Sign In</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
