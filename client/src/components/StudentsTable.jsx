import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const students = [
  {
    name: "Anshuman Kashyap",
    cohort: "AY 2024-25",
    courses: ["CBSE 9 Science", "CBSE 9 Math"],
    dateJoined: "17. Nov. 2024",
    lastLogin: "17. Nov. 2024 4:16 PM",
    status: "online",
  },
  {
    name: "Bansi Dadhaniya",
    cohort: "AY 2024-25",
    courses: ["CBSE 9 Science", "CBSE 9 Math"],
    dateJoined: "17. Nov. 2024",
    lastLogin: "17. Nov. 2024 4:16 PM",
    status: "offline",
  },
];

const courseImages = {
  "CBSE 9 Science": "https://via.placeholder.com/20",
  "CBSE 9 Math": "https://via.placeholder.com/20",
};

const StudentsTable = ({ search }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    cohort: "AY 2024-25",
    courses: [],
  });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student Data:", newStudent);
    setIsModalOpen(false);
  };

  if (filteredStudents.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg text-center text-sm">
        No students found
      </div>
    );
  }

  return (
    <div className="bg-white p-2 md:p-3 rounded-lg mt-2 shadow-lg">
      {/* Top section - Filters & Add Button */}
      <section className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select className="bg-gray-300 rounded-md px-3 py-1 font-semibold text-gray-500 text-sm">
            <option value="AY 2024-2025">AY 2024-2025</option>
          </select>
          <select className="bg-gray-300 rounded-md px-3 py-1 font-semibold text-gray-500 text-sm">
            <option value="CBSE 9">CBSE 9</option>
            <option value="CBSE 10">CBSE 10</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-300 rounded-md flex items-center px-3 py-2 text-gray-500 font-semibold text-sm cursor-pointer"
        >
          <FaPlus className="mr-2" /> Add new Student
        </button>
      </section>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[95%] max-w-md transform transition-all duration-300 scale-95">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Student
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 outline-none transition-all"
                    required
                  />
                </div>

                {/* Cohort Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Cohort
                  </label>
                  <select
                    name="cohort"
                    value={newStudent.cohort}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, cohort: e.target.value })
                    }
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 outline-none transition-all"
                    required
                  >
                    <option value="AY 2024-25">AY 2024-25</option>
                  </select>
                </div>

                {/* Courses Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Courses
                  </label>
                  <select
                    multiple
                    name="courses"
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        courses: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 outline-none transition-all"
                    required
                  >
                    <option value="CBSE 9 Science">CBSE 9 Science</option>
                    <option value="CBSE 9 Math">CBSE 9 Math</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse min-w-[600px] text-sm">
          <thead>
            <tr className="bg-white">
              <th className="p-2 text-left">Student Name</th>
              <th className="p-2 text-left">Cohort</th>
              <th className="p-2 text-left">Courses</th>
              <th className="p-2 text-left">Date Joined</th>
              <th className="p-2 text-left">Last Login</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-t font-medium border-gray-200">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.cohort}</td>
                <td className="p-2 flex flex-wrap gap-1">
                  {student.courses.map((course, i) => (
                    <span
                      key={i}
                      className="flex items-center px-2 py-1 rounded text-xs"
                    >
                      <img
                        src={
                          courseImages[course] ||
                          "https://via.placeholder.com/20"
                        }
                        alt={course}
                        className="w-4 h-4 mr-2"
                      />
                      {course}
                    </span>
                  ))}
                </td>
                <td className="p-2">{student.dateJoined}</td>
                <td className="p-2">{student.lastLogin}</td>
                <td className="p-2">
                  <span
                    className={`w-3 h-3 inline-block rounded-full ${
                      student.status === "online"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
