import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaRegQuestionCircle,
  FaRegCommentDots,
  FaSlidersH,
  FaBell,
} from "react-icons/fa";

const Header = ({ setSearch }) => {
  return (
    <header className="flex flex-col lg:flex-row items-center justify-start lg:gap-14 md:p-4 bg-gray-100">
      {/* Search Bar */}
      <div className="flex items-center bg-white px-4 py-3 rounded-lg w-full lg:w-[55%]">
        <CiSearch className="text-lg text-black" />
        <input
          type="text"
          placeholder="Search your course"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none px-2 w-full text-sm text-black font-medium"
        />
      </div>

      {/* Icons & User Profile (Stacked on mobile) */}
      <div className="flex flex-wrap justify-center lg:flex-nowrap items-center space-x-6 gap-6 mt-4 lg:mt-0">
        <FaRegQuestionCircle className="text-gray-600 text-lg cursor-pointer" />
        <div className="relative">
          <FaRegCommentDots className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-2.5 h-2.5 rounded-full"></span>
        </div>
        <FaSlidersH className="text-gray-600 text-lg cursor-pointer" />
        <div className="relative">
          <FaBell className="text-gray-500 text-lg cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-black text-xs w-2 h-2 rounded-full"></span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium ml-4 text-black">Adeline H. Dancy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
