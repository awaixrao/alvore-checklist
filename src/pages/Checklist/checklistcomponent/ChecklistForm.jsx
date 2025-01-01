import React, { useState, useEffect } from "react";
import Question from "./Questions";

const ChecklistForm = ({
  categories,
  setCategories,
  setChecklistPost,
  checklistPost,
}) => {
  const [selectedUnitCategories, setSelectedUnitCategories] = useState([]);
  const [branchInput, setBranchInput] = useState("");
  const [branches, setBranches] = useState([]);

  // Effect to sync checklistPost.branches with local branches
  useEffect(() => {
    if (checklistPost && checklistPost.branches) {
      setBranches(checklistPost.branches);
    }
  }, [checklistPost]);

  // Update questions in the categories
  const updateQuestion = (categoryId, questionId, updatedData) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === questionId ? { ...q, ...updatedData } : q
              ),
            }
          : cat
      )
    );
  };

  // Remove a question from a category
  const removeQuestion = (categoryId, questionId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.filter((q) => q.id !== questionId),
            }
          : cat
      )
    );
  };

  // Add a branch to the list
  const addBranch = () => {
    if (branchInput.trim() && !branches.includes(branchInput.trim())) {
      const newBranches = [...branches, branchInput.trim()];
      setBranches(newBranches);
      setBranchInput(""); // Clear the input field

      // Update checklistPost with the new branches array
      setChecklistPost((prev) => ({
        ...prev,
        branches: newBranches,
      }));
    } else {
      alert("Branch code is either empty or already added.");
    }
  };

  // Remove a branch from the list
  const removeBranch = (branchToRemove) => {
    const updatedBranches = branches.filter(
      (branch) => branch !== branchToRemove
    );
    setBranches(updatedBranches);

    // Update checklistPost with the new branches array
    setChecklistPost((prev) => ({
      ...prev,
      branches: updatedBranches,
    }));
  };

  // Handle unit category selection
  const handleCategorySelection = (e) => {
    const selected = e.target.value;
    if (selected && !selectedUnitCategories.includes(selected)) {
      setSelectedUnitCategories((prev) => [...prev, selected]);
    }
  };

  // Remove a category from the list
  const removeUnitCategory = (categoryToRemove) => {
    setSelectedUnitCategories((prev) =>
      prev.filter((cat) => cat !== categoryToRemove)
    );
  };

  // Handle saving the checklist
  const handleSaveChecklist = () => {
    // Ensure the branches and categories are non-empty before saving
    if (!branches.length) {
      alert("Please add at least one branch.");
      return;
    }
    if (!selectedUnitCategories.length) {
      alert("Please select at least one unit category.");
      return;
    }

    const payload = {
      title: "New Checklist", // Static for now, can be dynamic
      categories: selectedUnitCategories, // Sending array of categories
      branches: branches, // Sending array of branches
      questions: categories.flatMap((category) =>
        category.questions.map((q) => ({
          label: q.label,
          answerType: q.answerType,
          isRequired: q.isRequired || false,
          instruction: q.instruction || "",
          choices: q.choices.map((option) => ({
            text: option.text,
            icon: option.icon || "ok",
          })),
        }))
      ),
    };

    // Call the parent function to save the checklist
    setChecklistPost(payload);
  };

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Create Checklist</h2>

          {/* Checklist Title */}
          <div className="flex flex-col mb-6">
            <label className="text-lg font-semibold text-gray-700 mb-3">
              Enter Checklist Title
            </label>
            <input
              type="text"
              value={category.name}
              onChange={(e) =>
                setCategories((prev) =>
                  prev.map((cat) =>
                    cat.id === category.id
                      ? { ...cat, name: e.target.value }
                      : cat
                  )
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
              placeholder="Enter the checklist title"
            />
          </div>

          {/* Unit Category Selection */}
          <div className="flex flex-col mb-6">
            <label className="text-lg font-semibold text-gray-700 mb-3">
              Select Unit Categories
            </label>
            <select
              onChange={handleCategorySelection}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Delivery Units">Delivery Units</option>
              <option value="Sales Units">Sales Units</option>
              <option value="Supervision Units">Supervision Units</option>
            </select>
            <div className="flex flex-wrap mt-3">
              {selectedUnitCategories.map((cat) => (
                <span
                  key={cat}
                  className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                  onClick={() => removeUnitCategory(cat)}
                >
                  {cat} &times;
                </span>
              ))}
            </div>
          </div>

          {/* Branch Input */}
          <div className="flex flex-col mb-6">
            <label className="text-lg font-semibold text-gray-700 mb-3">
              Add Branches
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-lg"
                placeholder="Enter branch code"
              />
              <button
                onClick={addBranch}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-3">
              {branches.map((branch) => (
                <span
                  key={branch}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                  onClick={() => removeBranch(branch)}
                >
                  {branch} &times;
                </span>
              ))}
            </div>
          </div>

          {/* Questions Section */}
          {category.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              updateQuestion={(updatedData) =>
                updateQuestion(category.id, question.id, updatedData)
              }
              onRemove={() => removeQuestion(category.id, question.id)}
            />
          ))}
        </div>
      ))}
      <button
        onClick={handleSaveChecklist}
        className="px-6 py-2 bg-blue-600 text-white rounded-md mt-6"
      >
        Save Checklist
      </button>
    </div>
  );
};

export default ChecklistForm;
