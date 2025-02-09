import React, { useState, useEffect } from "react";
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
import NAIcon from "./NAIcon";
import { message } from "antd";

// Define the icons for status
const statusIcons = {
  ok: <FaCheckCircle className="text-green-500" />,
  not_ok: <FaTimesCircle className="text-red-500" />,
  warning: <FaExclamationCircle className="text-yellow-500" />,
  na: <NAIcon className="custom-icon-class" />,
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

const Question = ({ question, updateQuestion, onRemove, onUploadImage }) => {
  const [localQuestion, setLocalQuestion] = useState();
  console.log("question", question);
  console.log("updateQuestion", updateQuestion);
  console.log("onRemove", onRemove);
  console.log("localQuestion", localQuestion);

  useEffect(() => {
    if (question) {
      setLocalQuestion(question);
      console.log("Setting localQuestion:", question);
    }
  }, [question]);

  const handleUpdate = (updates) => {
    const updatedQuestion = { ...localQuestion, ...updates };
    setLocalQuestion(updatedQuestion);
    updateQuestion(updatedQuestion); // Update parent component
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        message.error('Please upload an image file');
        return;
      }
      
      // Optional: Add size limit (e.g., 5MB)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_SIZE) {
        message.error('Image size should be less than 5MB');
        return;
      }

      // Create a preview if needed
      const reader = new FileReader();
      reader.onloadend = () => {
        // You can store preview URL in local state if needed
        // setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      onUploadImage(file); // Pass the raw file to parent
    }
  };

  const handleAddChoice = () => {
    const updatedOptions = [...localQuestion.choices, { text: "", icon: "ok" }];
    handleUpdate({ choices: updatedOptions });
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...localQuestion.choices];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    handleUpdate({ choices: updatedOptions });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = (localQuestion.choices || []).filter(
      (_, i) => i !== index
    );
    handleUpdate({ choices: updatedOptions });
  };

  return (
    <div className="p-4 border rounded-md mb-4 bg-white shadow-md">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={localQuestion?.isRequired || false}
            onChange={(e) => handleUpdate({ isRequired: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Required</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md">
            {answerTypeIcons[localQuestion?.answerType]}
            <span className="text-sm text-gray-700">
              {localQuestion?.answerType || "Select Answer"}
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
          value={localQuestion?.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter the question"
        />
      </div>

      {/* Conditional Sections for Different Answer Types */}
      {localQuestion?.answerType == "mcqs" ||
      localQuestion?.answerType === "dropdown" ? (
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Add Options
          </label>
          {localQuestion?.choices?.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option?.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder={`Option ${index + 1}`}
              />
              <div className="flex ml-2 space-x-2">
                {["ok", "not_ok", "warning", "na"].map((iconValue) => (
                  <span
                    key={iconValue}
                    onClick={() => handleOptionChange(index, "icon", iconValue)}
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
      ) : null}
      {localQuestion?.answerType === "uploadimageslect" && (
        <div className="mb-4">
          <label className="text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md"
          />
          <p className="text-xs text-gray-500 mt-2">
            This image will be sent in the checklist's `uploadedImages` field.
          </p>
        </div>
      )}

      {/* Instructions Field for Dropdown or Image Types */}
      {(localQuestion?.answerType === "dropdown" ||
        localQuestion?.answerType === "image" ||
        localQuestion?.answerType === "uploadimageslect" ||
        localQuestion?.answerType === "takepicture") && (
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          <ReactQuill
            value={localQuestion?.instruction}
            onChange={(value) => handleUpdate({ instruction: value })}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default Question;
