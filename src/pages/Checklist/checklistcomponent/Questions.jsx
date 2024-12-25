import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import {
  FaTimes,
  FaListAlt,
  FaBars,
  FaRegFileAlt,
  FaCamera,
  FaCalendarAlt,
  FaSignature,
  FaFileUpload,
  FaCameraRetro,
} from "react-icons/fa";

// Define the icons object for mapping answer types
const icons = {
  mcqs: <FaListAlt />,
  dropdown: <FaBars />,
  text: <FaRegFileAlt />,
  image: <FaFileUpload />,
  takepicture: <FaCamera />,
  date: <FaCalendarAlt />,
  uploadimageslect: <FaCameraRetro />,
  signature: <FaSignature />,
};

const Question = ({ question, updateQuestion, onRemove }) => {
  return (
    <div className="p-4 border rounded-md mb-4 bg-white shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Left: Required Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={question.required || false}
            onChange={(e) => updateQuestion({ required: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Required</span>
        </div>

        {/* Right: Answer Type and Cancel Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md">
            {icons[question.answerType] || null}
            <span className="text-sm text-gray-700">
              {question.answerType || "Select Answer"}
            </span>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Question Input */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Question
        </label>
        <input
          type="text"
          value={question.label}
          onChange={(e) => updateQuestion({ label: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter the question"
        />
      </div>

      {/* Options for Dropdown or MCQs */}
      {["mcqs", "dropdown"].includes(question.answerType) && (
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Add Options
          </label>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...question.options];
                  updatedOptions[index] = e.target.value;
                  updateQuestion({ options: updatedOptions });
                }}
                className="w-full px-3 py-2 border rounded-md"
                placeholder={`Option ${index + 1}`}
              />
              <button
                onClick={() => {
                  const updatedOptions = question.options.filter(
                    (_, i) => i !== index
                  );
                  updateQuestion({ options: updatedOptions });
                }}
                className="ml-2 text-red-500 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              updateQuestion({
                options: [...question.options, ""],
              })
            }
            className="mt-2 w-32 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Choices
          </button>
        </div>
      )}

      {/* Instructions Field */}
      {["dropdown", "image", "takepicture", "date"].includes(
        question.answerType
      ) && (
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <ReactQuill
            value={question.instructions || ""}
            onChange={(value) => updateQuestion({ instructions: value })}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default Question;