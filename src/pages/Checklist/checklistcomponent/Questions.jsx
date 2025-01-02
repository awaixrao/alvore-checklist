import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaListAlt,
  FaBars,
  FaRegFileAlt,
  FaCamera,
  FaCalendarAlt,
  FaSignature,
  FaFileUpload,
  FaCameraRetro,
} from "react-icons/fa";

// Define the icons for status
const statusIcons = {
  ok: <FaCheckCircle className="text-green-500" />,
  not_ok: <FaTimesCircle className="text-red-500" />,
  warning: <FaExclamationCircle className="text-yellow-500" />,
};

// Define the icons object for answer types
const answerTypeIcons = {
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
  const handleAddChoice = () => {
    const updatedOptions = [
      ...(question.choices || []),
      { text: "", icon: "ok" },
    ];
    updateQuestion({ choices: updatedOptions });
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...(question.choices || [])];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    updateQuestion({ choices: updatedOptions });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = (question.choices || []).filter(
      (_, i) => i !== index
    );
    updateQuestion({ choices: updatedOptions });
  };

  return (
    <div className="p-4 border rounded-md mb-4 bg-white shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={question.isRequired || false}
            onChange={(e) => updateQuestion({ isRequired: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Required</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md">
            {answerTypeIcons[question.answerType] || null}
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

      {/* Choices Section for Dropdown or MCQs */}
      {["mcqs", "dropdown"].includes(question.answerType) && (
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Add Options
          </label>
          {["mcqs", "dropdown"].includes(question.answerType) && (
            <div className="flex flex-col mb-4">
              {(question.choices || []).map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  {/* Text input for choice */}
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(index, "text", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder={`Option ${index + 1}`}
                  />

                  {/* Icons for selection */}
                  <div className="flex ml-2 space-x-2">
                    {["ok", "not_ok", "warning"].map((iconValue) => (
                      <span
                        key={iconValue}
                        onClick={() =>
                          handleOptionChange(index, "icon", iconValue)
                        }
                        className={`cursor-pointer text-xl ${
                          option.icon === iconValue
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        {statusIcons[iconValue]}
                      </span>
                    ))}
                  </div>

                  {/* Display selected icon */}
                  <span className="ml-2">{statusIcons[option.icon]}</span>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="ml-2 text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddChoice}
                className="mt-2 w-32 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Choices
              </button>
            </div>
          )}
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
            value={question.instruction || ""}
            onChange={(value) => updateQuestion({ instruction: value })}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default Question;
