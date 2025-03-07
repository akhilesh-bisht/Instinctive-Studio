import React from "react";
import logo from "../assets/logo.svg";
import {
  FaUserGraduate,
  FaBook,
  FaQuestionCircle,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { RiDashboard3Line } from "react-icons/ri";

const Sidebar = () => {
  const sidebarLinks = [
    { icon: RiDashboard3Line, text: "Dashboard" },
    { icon: FaUserGraduate, text: "Students", active: true },
    { icon: FaBook, text: "Chapter" },
    { icon: FaQuestionCircle, text: "Help" },
    { icon: FaChartBar, text: "Reports" },
    { icon: FaCog, text: "Settings" },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white text-gray-500 h-screen p-3 md:p-6">
      <img className="w-16 md:w-28" src={logo} alt="" />
      <ul className="space-y-4 mt-5">
        {sidebarLinks.map((link, index) => (
          <li
            key={index}
            className={`flex items-center md:space-x-2 p-2 font-semibold rounded ${
              link.active
                ? "bg-gray-300 text-black font-bold"
                : "hover:bg-gray-300"
            }`}
          >
            <link.icon className="text-xl md:text-base" />
            <span className="hidden md:inline">{link.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
