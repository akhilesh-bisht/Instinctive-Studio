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
    <div className="bg-white p-2 md:p-3 rounded-lg mt-2 shadow-lg w-full overflow-x-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4 w-full">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
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

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-300 rounded-md flex items-center px-3 py-2 text-gray-500 font-semibold text-sm cursor-pointer"
        >
          <FaPlus className="mr-2" /> Add Student
        </button>
      </div>

      <div className="mt-4">
        {status === "loading" ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="block md:hidden grid grid-cols-1 gap-4">
              {filteredStudents.map((student, index) => (
                <div key={index} className="border p-3 rounded-lg shadow-md">
                  <p>
                    <strong>Name:</strong> {student.name}
                  </p>
                  <p>
                    <strong>Cohort:</strong> {student.cohort}
                  </p>
                  <p>
                    <strong>Courses:</strong>{" "}
                    {student.courses?.join(", ") || "No Courses"}
                  </p>
                  <p>
                    <strong>Joined:</strong>{" "}
                    {new Date(student.date_joined).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Last Login:</strong>{" "}
                    {new Date(student.last_login).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`w-3 h-3 rounded-full inline-block ${
                        student.status === "online"
                          ? "bg-green-500"
                          : "bg-red-400"
                      }`}
                    ></span>
                  </p>
                </div>
              ))}
            </div>
            <table className="hidden md:table w-full border-collapse min-w-[600px] text-sm">
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
                      {student.courses?.join(", ") || "No Courses"}
                    </td>
                    <td className="p-2">
                      {new Date(student.date_joined).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {new Date(student.last_login).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`w-3 h-3 rounded-full inline-block ${
                          student.status === "online"
                            ? "bg-green-500"
                            : "bg-red-400"
                        }`}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
