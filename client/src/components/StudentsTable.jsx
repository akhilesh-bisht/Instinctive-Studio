import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { fetchUsers, addUser } from "../redux/store/userSlice";

const StudentsTable = ({ search }) => {
  const dispatch = useDispatch();
  const { users: students, status } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [newStudent, setNewStudent] = useState({
    name: "",
    cohort: "AY 2024-25",
    date_joined: new Date().toISOString(),
    last_login: new Date().toISOString(),
    status: "offline",
    courses: [],
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const selectedCourses = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewStudent((prev) => ({ ...prev, courses: selectedCourses }));
  };

  // submit form data

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(newStudent));
    setIsModalOpen(false);
    setNewStudent({
      name: "",
      cohort: "AY 2024-25",
      date_joined: new Date().toISOString(),
      last_login: new Date().toISOString(),
      status: "offline",
      courses: [],
    });
  };

  // filtter students based on search, cohort and course

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      ?.toLowerCase()
      .includes(search?.toLowerCase() || "");
    const matchesCohort =
      selectedCohort === "all" || student.cohort === selectedCohort;
    const matchesCourse =
      selectedCourse === "all" ||
      (student.courses &&
        student.courses.some((course) => course === selectedCourse));
    return matchesSearch && matchesCohort && matchesCourse;
  });

  return (
    <div className="bg-white p-2 md:p-3 rounded-lg mt-2 shadow-lg">
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center ">
        <div className="flex flex-wrap  gap-4 mb-4">
          <select
            className="bg-gray-300 rounded-md px-3 py-1 font-semibold text-gray-500 text-sm"
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
          >
            <option value="all">All Cohorts</option>
            <option value="AY 2024-25">AY 2024-25</option>
            <option value="AY 2023-24">AY 2023-24</option>
          </select>

          <select
            className="bg-gray-300 rounded-md px-3 py-1 font-semibold text-gray-500 text-sm"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="CBSE 9 Science">CBSE 9 Science</option>
            <option value="CBSE 9 Math">CBSE 9 Math</option>
            <option value="CBSE 10 Science">CBSE 10 Science</option>
            <option value="CBSE 10 Math">CBSE 10 Math</option>
          </select>
        </div>
        <section className="flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-300 rounded-md flex items-center px-3 py-2 text-gray-500 font-semibold text-sm cursor-pointer"
          >
            <FaPlus className="mr-2" /> Add new Student
          </button>
        </section>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[95%] max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Student
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Student Name"
                required
              />

              {/* Cohort */}
              <select
                name="cohort"
                value={newStudent.cohort}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              >
                <option value="AY 2024-25">AY 2024-25</option>
                <option value="AY 2023-24">AY 2023-24</option>
              </select>

              {/* Status */}
              <select
                name="status"
                value={newStudent.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>

              {/* Courses Multi-Select */}
              <select
                name="courses"
                multiple
                onChange={handleCourseChange}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                required
              >
                <option value="CBSE 9 Science">CBSE 9 Science</option>
                <option value="CBSE 9 Math">CBSE 9 Math</option>
                <option value="CBSE 10 Science">CBSE 10 Science</option>
                <option value="CBSE 10 Math">CBSE 10 Math</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert("Student Added Successfully")}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="overflow-x-auto mt-4">
        {status === "loading" ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
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
                <tr
                  key={index}
                  className="border-t font-medium border-gray-200"
                >
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.cohort}</td>
                  <td className="p-2">
                    {student.courses && student.courses.length > 0
                      ? student.courses.join(", ")
                      : "No Courses"}
                  </td>
                  <td className="p-2">
                    {new Date(student.date_joined).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(student.last_login).toLocaleDateString()}
                  </td>
                  <td className="p-2 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        student.status === "online"
                          ? "bg-green-500"
                          : "bg-red-400"
                      }`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
