import React, { useState } from "react";
import { Button, message } from "antd";
import DashboardHeader from "../../UI/Header";
import ChecklistForm from "./checklistcomponent/ChecklistForm";
import Sidebar from "./checklistcomponent/ChecklistSidebar";
import Popup from "../../UI/PopUp";
import checklist from "../../assets/checklistimg.png";

import { usePostMutation } from "../../services/apiService";

const ChecklistPage = () => {
  const [categories, setCategories] = useState([]);
  const [isChecklistCreated, setIsChecklistCreated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [createChecklist, { isLoading }] = usePostMutation();

  // Function to handle adding an answer type from Sidebar
  const onAddAnswerType = (answerType) => {
    if (!categories.length) {
      message.error("Please create a checklist first.");
      return;
    }

    setCategories((prev) =>
      prev.map((category, index) =>
        index === 0
          ? {
              ...category,
              questions: [
                ...category.questions,
                {
                  id: Date.now(),
                  label: "",
                  answerType,
                  required: false,
                  options: [],
                  instructions: "", // Default empty instructions
                },
              ],
            }
          : category
      )
    );
  };

  const handleSaveChecklist = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Prepare payload
      const payload = {
        title: categories[0]?.name || "New Checklist",
        questions: categories[0]?.questions.map((question) => ({
          label: question.label,
          answerType: question.answerType,
          isRequired: question.required,
          choices: question.options || [],
          instructions: question.instructions || "",
        })),
      };

      // Call API
      const response = await createChecklist({
        path: "checklist/create",
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();

      message.success(response.message || "Checklist created successfully!");
      setShowPopup(true); // Show the popup after success
      setCategories([]); // Clear categories
      setIsChecklistCreated(false); // Reset state
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to create checklist. Please try again."
      );
    }
  };

  const handleCancelChecklist = () => {
    setCategories([]);
    setIsChecklistCreated(false);
  };

  const addCategory = () => {
    setCategories([
      {
        id: Date.now(),
        name: "",
        questions: [],
      },
    ]);
    setIsChecklistCreated(true);
  };

  return (
    <>
      <DashboardHeader image={checklist} />

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header with Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">New Inspection Items</h1>
          {isChecklistCreated ? (
            <div className="flex space-x-4">
              <Button
                onClick={handleCancelChecklist}
                className="rounded border px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                loading={isLoading}
                onClick={handleSaveChecklist}
                className="rounded px-6 py-2 bg-blue-600 hover:bg-blue-500"
              >
                Save Checklist
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={addCategory}
              className="rounded bg-blue-600 hover:bg-blue-500 px-6 py-2"
            >
              Create New Checklist
            </Button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex">
          <div className="flex-1 bg-white shadow-md rounded-md p-6">
            {isChecklistCreated ? (
              <ChecklistForm
                categories={categories}
                setCategories={setCategories}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-600">
                  Click "Create New Checklist" to start.
                </p>
              </div>
            )}
          </div>
          <Sidebar onAddAnswerType={onAddAnswerType} />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <Popup
          message="Congratulations!"
          description="Your checklist was created successfully."
          onClose={() => setShowPopup(false)} // Close popup
        />
      )}
    </>
  );
};

export default ChecklistPage;
