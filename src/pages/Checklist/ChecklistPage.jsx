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
  const [uploadedImages, setUploadedImages] = useState([]); // Store uploaded images here

  const [isChecklistCreated, setIsChecklistCreated] = useState(false);
  const [showChecklistList, setShowChecklistList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState();

  const [createChecklist, { isLoading }] = usePostMutation();
  const [updateChecklist] = usePutMutation();

  // Add new question type
  const onAddAnswerType = (answerType) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: Date.now(),
        label: "",
        answerType,
        isRequired: false,
        choices: [],
        instruction: "",
      },
    ]);
  };

  // Handle image uploads
  const handleUploadImage = (file) => {
    setUploadedImages((prev) => [...prev, file]); // Store the image file directly
  };

  // Save the checklist
  const handleSaveChecklist = async () => {
    const { title, branches, categories } = checklistPost;

    // Validation
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
      const formData = new FormData();
      formData.append("title", title);
      branches.forEach((branch) => formData.append("branches[]", branch));
      categories.forEach((category) =>
        formData.append("categories[]", category._id)
      );

      // Append questions correctly
      questions.forEach((question, index) => {
        formData.append(`questions[${index}][id]`, question.id);
        formData.append(`questions[${index}][label]`, question.label);
        formData.append(`questions[${index}][answerType]`, question.answerType);
        formData.append(
          `questions[${index}][isRequired]`,
          question.isRequired ? "true" : "false"
        );
        formData.append(
          `questions[${index}][instruction]`,
          question.instruction
        );

        // Append choices properly as objects
        question.choices.forEach((choice, choiceIndex) => {
          formData.append(
            `questions[${index}][choices][${choiceIndex}][text]`,
            choice.text
          );
          formData.append(
            `questions[${index}][choices][${choiceIndex}][icon]`,
            choice.icon
          );
        });
      });

      // Append uploaded images without indexing
      uploadedImages.forEach((image) => {
        formData.append("uploadedImages", image); // No indexing
      });

      const token = localStorage.getItem("authToken");

      // Conditional API Call: Create or Update
      let response;
      if (!editingChecklist) {
        // Create a new checklist
        response = await createChecklist({
          path: "checklist/create",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }).unwrap();
        message.success(response.message || "Checklist created successfully!");
      } else {
        // Update an existing checklist
        response = await updateChecklist({
          path: `checklist/update/${editingChecklist?._id}`,
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }).unwrap();
        message.success(response.message || "Checklist updated successfully!");
      }

      // Reset states after successful operation
      setUploadedImages([]);
      setCategories([]);
      setQuestions([]);
      setEditingChecklist(null); // Reset editing state
      setIsChecklistCreated(false);
      setShowPopup(true);
    } catch (error) {
      // Error Message
      message.error(
        error?.data?.message || "Failed to save checklist. Please try again."
      );
    }
  };

  // Cancel checklist creation
  const handleCancelChecklist = () => {
    setChecklistPost({
      title: "",
      branches: [],
      categories: [],
    });
    setQuestions([]);
    setCategories([]);
    setUploadedImages([]);
    setIsChecklistCreated(false);
    setEditingChecklist(null);
    message.info("Checklist creation canceled.");
  };

  // Add a new category
  const addCategory = () => {
    setChecklistPost({
      title: "",
      branches: [],
      categories: [],
    });
    setQuestions([]);
    setCategories([]);
    setIsChecklistCreated(true);
  };

  // Edit an existing checklist
  const handleEditChecklist = (checklist) => {
    if (!checklist || !checklist.questions) {
      message.error("Checklist data is incomplete or invalid.");
      return;
    }

    const mappedQuestions = checklist.questions.map((q, index) => ({
      id: index,
      label: q.label || "",
      answerType: q.answerType || "",
      isRequired: q.isRequired || false,
      choices: q.choices || [],
      instruction: q.instruction || "",
    }));

    setQuestions(mappedQuestions);

    const mappedCategories = checklist.categories.map((cat, index) => ({
      id: index,
      name: cat,
      questions: [],
    }));
    setCategories(mappedCategories);

    setChecklistPost({
      title: checklist.title,
      branches: checklist.branches.map((branch) => branch.branchCode),
      categories: checklist.categories,
    });

    setIsChecklistCreated(true);
    setEditingChecklist(checklist);
    setShowChecklistList(false);
  };

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
                    questions={questions}
                    handleUploadImage={handleUploadImage} // Pass the function here
                    setQuestions={setQuestions}
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
