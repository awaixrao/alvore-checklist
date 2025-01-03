import React from "react";
import {
  FaListAlt,
  FaBars,
  FaRegFileAlt,
  FaCamera,
  FaCalendarAlt,
  FaSignature,
  FaFileUpload,
  FaCameraRetro,
} from "react-icons/fa";

const Sidebar = ({ onAddAnswerType }) => {
  const answerTypes = [
    { value: "mcqs", label: "Select Answer", icon: <FaListAlt /> },
    { value: "dropdown", label: "Drop Down Answer", icon: <FaBars /> },
    { value: "text", label: "Fill In Space (Text)", icon: <FaRegFileAlt /> },
    { value: "image", label: "Upload Image", icon: <FaFileUpload /> },
    { value: "takepicture", label: "Take Picture", icon: <FaCamera /> },
    { value: "date", label: "Select Date", icon: <FaCalendarAlt /> },
    {
      value: "uploadimageslect",
      label: "Upload Image With Point To Select",
      icon: <FaCameraRetro />,
    },
    { value: "signature", label: "Signature", icon: <FaSignature /> },
  ];

  return (
    <div className="w-1/3 ml-4 bg-white shadow-lg rounded-lg p-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Answer Types</h2>
      {answerTypes.map((type) => (
        <div
          key={type.value}
          className="flex justify-between items-center mb-4 bg-gray-50 px-5 py-3 rounded-md hover:bg-gray-100 transition duration-200"
        >
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-xl">{type.icon} </span>
            <span className="text-gray-700 font-medium">{type.label}</span>
          </div>
          <button
            onClick={() => onAddAnswerType(type.value)} // Pass backend-friendly value
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
