import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import DashboardHeader from "../../UI/Header";
import ChecklistForm from "./checklistcomponent/ChecklistForm";
import Sidebar from "./checklistcomponent/checklistSidebar";
import ChecklistList from "./checklistcomponent/ChecklistList";
import Popup from "../../UI/PopUp";
import checklist from "../../assets/checklistimg.png";

import { usePostMutation } from "../../services/apiService";

const ChecklistPage = () => {
  const [categories, setCategories] = useState([]);
  const [checklistPost, setChecklistPost] = useState({});
  const [isChecklistCreated, setIsChecklistCreated] = useState(false);
  const [showChecklistList, setShowChecklistList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [createChecklist, { isLoading }] = usePostMutation();

  // const onAddAnswerType = (answerType) => {
  //   if (!categories.length) {
  //     message.error("Please create a checklist first.");
  //     return;
  //   }

  //   setCategories((prev) =>
  //     prev.map((category, index) =>
  //       index === 0
  //         ? {
  //             ...category,
  //             questions: [
  //               ...category.questions,
  //               {
  //                 id: Date.now(),
  //                 label: "",
  //                 answerType,
  //                 isRequired: false,
  //                 choices: [],
  //                 instruction: "",
  //               },
  //             ],
  //           }
  //         : category
  //     )
  //   );
  // };
  const onAddAnswerType = (answerType) => {
    if (!categories.length) {
      message.error("Please create a category first.");
      return;
    }

    setCategories((prev) =>
      prev.map((category, index) =>
        index === 0 // Add to the first category (or use a specific ID/logic)
          ? {
              ...category,
              questions: [
                ...category.questions,
                {
                  id: Date.now(),
                  label: "",
                  answerType,
                  isRequired: false,
                  choices: [],
                  instruction: "",
                },
              ],
            }
          : category
      )
    );
  };

  const handleSaveChecklist = async () => {
    const { title, branches, categories: unitCategories } = checklistPost;

    if (!title?.trim()) {
      message.error("Checklist title is required.");
      return;
    }

    if (!branches || branches.length === 0) {
      message.error("Please add at least one branch.");
      return;
    }

    if (!unitCategories || unitCategories.length === 0) {
      message.error("Please select at least one unit category.");
      return;
    }

    const questions = categories.flatMap((category) =>
      category.questions.map((q) => ({
        label: q.label,
        answerType: q.answerType,
        isRequired: q.isRequired || false,
        instruction: q.instruction || "",
        choices: q.choices || [],
      }))
    );

    if (!questions || questions.length === 0) {
      message.error("Please add at least one question.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await createChecklist({
        path: "checklist/create",
        body: { ...checklistPost, questions },
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
    console.log("checklist", checklist);
    console.log("categories edit", categories);
    console.log("editingChecklist", editingChecklist);

    setEditingChecklist(checklist);
    setCategories([
      {
        id: Date.now(),
        name: checklist.title,
        questions: checklist.questions.map((q) => ({
          id: Date.now() + Math.random(),
          label: q.label,
          answerType: q.answerType,
          isRequired: q.isRequired,
          choices: q.choices || [],
          instruction: q.instruction || "",
        })),
      },
    ]);
    setIsChecklistCreated(true);
    setShowChecklistList(false);
  };

  console.log("categories", categories);

  return (
    <>
      <DashboardHeader image={checklist} />
      <div className="p-6 bg-gray-100 min-h-screen">
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
              {!showChecklistList && (
                <Button
                  type="primary"
                  onClick={addCategory}
                  className="rounded bg-blue-600 hover:bg-blue-500 px-6 py-2"
                >
                  Create New Checklist
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          {showChecklistList ? (
            <div className="flex-1 bg-white shadow-md rounded-md p-6">
              <ChecklistList onEdit={handleEditChecklist} />
            </div>
          ) : (
            <>
              <div className="flex-1 bg-white shadow-md rounded-md p-6">
                {isChecklistCreated ? (
                  <ChecklistForm
                    setChecklistPost={setChecklistPost}
                    categories={categories}
                    setCategories={setCategories}
                    checklistPost={checklistPost}
                    editingChecklist={editingChecklist}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-600">
                      Click "Create New Checklist" to start or "Show Checklists"
                      to view existing ones.
                    </p>
                  </div>
                )}
              </div>
              <Sidebar onAddAnswerType={onAddAnswerType} />
            </>
          )}
        </div>
      </div>
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
