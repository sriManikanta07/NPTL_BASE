import React, { useState } from "react";
import { Search, X } from "lucide-react";

// Mock database of valid student IDs
const validStudents = {
  N210699: {
    studentId: "N210699",
    name: "John Doe",
    email: "john.doe@example.com",
    registeredCourses: 3,
    courseList: [
      { courseId: "NOC23-CS123", status: "Active" },
      { courseId: "NOC23-CS456", status: "Process" },
      { courseId: "NOC23-CS789", status: "Active" },
    ],
  },
  N210700: {
    studentId: "N210700",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    registeredCourses: 2,
    courseList: [
      { courseId: "NOC23-CS234", status: "Active" },
      { courseId: "NOC23-CS567", status: "Process" },
    ],
  },
};

function App() {
  const [studentId, setStudentId] = useState("");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    const foundStudent = validStudents[studentId];
    if (foundStudent) {
      setDetails(foundStudent);
    } else {
      setError("No student found with the provided ID");
      setDetails(null);
    }
  };

  const handleClose = () => {
    setDetails(null);
    setStudentId("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-4 sm:px-6 shadow-lg">
        <h1 className="text-lg sm:text-xl font-bold text-center">
          NPTEL COURSE REGISTRATION DETAILS
        </h1>
      </header>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto mt-4 sm:mt-8 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex sm:flex-row items-center gap-0 sm:gap-1 mb-4">
            <label
              htmlFor="studentId"
              className="font-semibold text-xl mr-2 min-w-[2rem]"
            >
              ID :
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Student ID"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full p-4 mx-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search size={15} />
            SEARCH
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Course Details Display */}
        {details && (
          <div className="mt-4 sm:mt-8">
            <div className="bg-green-600 text-white py-2 px-4 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold">Details</h2>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bg-green-50 p-4 sm:p-6 rounded-b-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Student ID</p>
                  <p className="text-gray-700 break-all">{details.studentId}</p>
                </div>
                <div>
                  <p className="font-semibold">Name</p>
                  <p className="text-gray-700 break-all">{details.name}</p>
                </div>
                <div>
                  <p className="font-semibold">NPTEL Account Email</p>
                  <p className="text-gray-700 break-all">{details.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Number of Registered Courses</p>
                  <p className="text-gray-700">{details.registeredCourses}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Course List</h3>
                <div className="space-y-3">
                  {details.courseList.map((course, index) => (
                    <div
                      key={index}
                      className="flex sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded-lg shadow-sm gap-2 sm:gap-0"
                    >
                      <span className="font-medium break-all">
                        {course.courseId}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
