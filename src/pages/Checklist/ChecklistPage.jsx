import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import DashboardHeader from "../../UI/Header";
import ChecklistForm from "./checklistcomponent/ChecklistForm";
import Sidebar from "./checklistcomponent/checklistSidebar";
import ChecklistList from "./checklistcomponent/ChecklistList";
import Popup from "../../UI/PopUp";
import checklist from "../../assets/checklistimg.png";

import { usePostMutation, usePutMutation } from "../../services/apiService";

const ChecklistPage = () => {
  const [categories, setCategories] = useState([]);
  const [checklistPost, setChecklistPost] = useState({});
  const [questions, setQuestions] = useState([]);

  const [isChecklistCreated, setIsChecklistCreated] = useState(false);
  const [showChecklistList, setShowChecklistList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState();
  const [createChecklist, { isLoading }] = usePostMutation();
  const [updateChecklist] = usePutMutation();

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
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: Date.now(), // Generate a unique ID
        label: "", // Default empty label
        answerType, // Selected answer type
        isRequired: false, // Default to not required
        choices: [], // Initialize empty choices
        instruction: "", // Default empty instruction
      },
    ]);
  };

  const handleSaveChecklist = async () => {
    const { title, branches, categories } = checklistPost;

    if (!title?.trim()) {
      message.error("Checklist title is required.");
      return;
    }

    if (!branches || branches.length === 0) {
      message.error("Please add at least one branch.");
      return;
    }

    if (!categories || categories.length === 0) {
      message.error("Please select at least one category.");
      return;
    }

    if (!questions || questions.length === 0) {
      message.error("Please add at least one question.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!editingChecklist) {
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
        setQuestions([]);
        setIsChecklistCreated(false);
      }
      if (editingChecklist) {
        const response = await updateChecklist({
          path: `checklist/update/${editingChecklist?._id}`,
          method: "PUT",
          body: { ...checklistPost, questions },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).unwrap();
        message.success(response.message || "Checklist updated successfully!");
        setShowPopup(true);
        setCategories([]);
        setQuestions([]);
        setIsChecklistCreated(false);
      }
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to create checklist. Please try again."
      );
    }
  };

  const handleCancelChecklist = () => {
    setChecklistPost({
      title: "",
      branches: [],
      categories: [],
    }); // Reset the checklist post data
    setQuestions([]); // Reset the questions
    setCategories([]); // Reset the categories
    setIsChecklistCreated(false); // Exit creation/edit mode
    setEditingChecklist(null); // Ensure editing state is cleared
    message.info("Checklist  canceled. .");
  };

  const addCategory = () => {
    setChecklistPost({
      title: "",
      branches: [],
      categories: [],
    }); // Initialize for a new checklist
    setQuestions([]); // Clear any leftover questions
    setCategories([]); // Start with no categories
    setIsChecklistCreated(true); // Enter create mode
  };

  console.log("editingChecklist", editingChecklist);

  const handleEditChecklist = (checklist) => {
    console.log("Checklist being edited:", checklist);

    // Ensure checklist contains questions and categories
    if (!checklist || !checklist.questions) {
      message.error("Checklist data is incomplete or invalid.");
      return;
    }

    // Map questions
    const mappedQuestions = checklist.questions.map((q, qIndex) => ({
      id: qIndex,
      label: q.label || "",
      answerType: q.answerType || "",
      isRequired: q.isRequired || false,
      choices: q.choices || [],
      instruction: q.instruction || "",
    }));

    console.log("Mapped questions:", mappedQuestions);

    // Update questions state
    setQuestions(mappedQuestions);

    // Update categories state (if needed, otherwise skip)
    const mappedCategories = checklist.categories.map((cat, index) => ({
      id: index,
      name: cat,
      questions: [],
    }));
    setCategories(mappedCategories);

    // Update other states
    setChecklistPost({
      title: checklist.title,
      branches: checklist.branches.map((branch) => branch.branchCode),
      categories: checklist.categories,
    });

    setIsChecklistCreated(true); // Show the edit form
    setEditingChecklist(checklist); // Keep track of the checklist being edited
    setShowChecklistList(false); // Hide the checklist list

    console.log("ChecklistPost:", checklistPost);
    console.log("Categories:", mappedCategories);
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
                    questions={questions} // Pass questions
                    setQuestions={setQuestions} // Pass setter if needed
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
