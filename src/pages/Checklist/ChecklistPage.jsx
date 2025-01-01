import React, { useState } from "react";
import { Button, message } from "antd";
import DashboardHeader from "../../UI/Header";
import ChecklistForm from "./checklistcomponent/ChecklistForm";
import Sidebar from "./checklistcomponent/checklistSidebar";
import ChecklistList from "./checklistcomponent/ChecklistList"; // Import the ChecklistList component
import Popup from "../../UI/PopUp";
import checklist from "../../assets/checklistimg.png";

import { usePostMutation } from "../../services/apiService";

const ChecklistPage = () => {
  const [categories, setCategories] = useState([]);
  const [checklistPost, setChecklistPost] = useState();
  const [isChecklistCreated, setIsChecklistCreated] = useState(false);
  const [showChecklistList, setShowChecklistList] = useState(false); // Toggle checklist list
  const [showPopup, setShowPopup] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null); // For editing checklist
  const [createChecklist, { isLoading }] = usePostMutation();

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
    if (
      !checklistPost ||
      !checklistPost.branches ||
      checklistPost.branches.length === 0
    ) {
      message.error("Branches must be a non-empty array.");
      return;
    }

    if (!checklistPost.categories || checklistPost.categories.length === 0) {
      message.error("Please select at least one unit category.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await createChecklist({
        path: "checklist/create",
        body: checklistPost,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).unwrap();

      message.success(response.message || "Checklist created successfully!");
      setShowPopup(true);
      setCategories([]);
      setIsChecklistCreated(false);
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to create checklist. Please try again."
      );
    }
  };

  const handleCancelChecklist = () => {
    setCategories([]);
    setIsChecklistCreated(false);
    setEditingChecklist(null);
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

  const handleEditChecklist = (checklist) => {
    setEditingChecklist(checklist);
    setCategories([
      {
        id: Date.now(),
        name: checklist.title,
        questions: checklist.questions.map((q) => ({
          id: Date.now() + Math.random(),
          label: q.label,
          answerType: q.answerType,
          required: q.isRequired,
          options: q.choices,
          instructions: q.instructions,
        })),
      },
    ]);
    setIsChecklistCreated(true);
    setShowChecklistList(false); // Hide the checklist list during editing
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
            <div className="flex space-x-4">
              <Button
                type="default"
                onClick={() => setShowChecklistList(!showChecklistList)}
                className="rounded border px-6 py-2"
              >
                {showChecklistList ? "Hide Checklists" : "Show Checklists"}
              </Button>
              <Button
                type="primary"
                onClick={addCategory}
                className="rounded bg-blue-600 hover:bg-blue-500 px-6 py-2"
              >
                Create New Checklist
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex">
          <div className="flex-1 bg-white shadow-md rounded-md p-6">
            {isChecklistCreated ? (
              <ChecklistForm
                setChecklistPost={setChecklistPost}
                categories={categories}
                setCategories={setCategories}
              />
            ) : showChecklistList ? (
              <ChecklistList onEdit={handleEditChecklist} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-600">
                  Click "Create New Checklist" to start or "Show Checklists" to
                  view existing ones.
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
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default ChecklistPage;
