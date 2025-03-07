import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StudentsTable from "../components/StudentsTable";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <Header setSearch={setSearch} />
        <StudentsTable search={search} />
      </div>
    </div>
  );
};

export default Dashboard;
