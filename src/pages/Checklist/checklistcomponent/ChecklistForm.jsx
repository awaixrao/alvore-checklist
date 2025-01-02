import React, { useState, useEffect } from "react";
import Question from "./Questions";

const ChecklistForm = ({
  categories,
  setCategories,
  setChecklistPost,
  checklistPost,
  editingChecklist,
}) => {
  const [selectedUnitCategories, setSelectedUnitCategories] = useState([]);
  const [branchInput, setBranchInput] = useState("");
  const [checklistTitle, setChecklistTitle] = useState("");
  const [branches, setBranches] = useState([]);

  // Populate form fields when editingChecklist changes
  useEffect(() => {
    if (editingChecklist) {
      setChecklistTitle(editingChecklist?.title || "");
      setSelectedUnitCategories(editingChecklist?.categories || []);
      setBranches(editingChecklist?.branches || []);
      setCategories(
        Array.isArray(editingChecklist.categories)
          ? editingChecklist?.categories?.map((cat, index) => ({
              id: index,
              name: cat,
              questions: editingChecklist.questions || [],
            }))
          : []
      );
    }
  }, [editingChecklist, setCategories]);
  console.log("at the form page", editingChecklist);
  console.log("branchInput", branchInput);
  console.log("checklistTitle", checklistTitle);
  console.log(selectedUnitCategories);

  useEffect(() => {
    setChecklistPost((prev) => ({
      ...prev,
      title: checklistTitle,
      categories: selectedUnitCategories,
      branches,
    }));
  }, [checklistTitle, selectedUnitCategories, branches, setChecklistPost]);

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

  return (
    <div>
      <div className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Checklist</h2>
        <div className="flex flex-col mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3">
            Checklist Title
          </label>
          <input
            type="text"
            value={checklistTitle}
            onChange={(e) => setChecklistTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
            placeholder="Enter the checklist title"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3">
            Select Unit Categories
          </label>
          <select
            onChange={(e) => {
              const selected = e.target.value;
              if (selected && !selectedUnitCategories.includes(selected)) {
                setSelectedUnitCategories((prev) => [...prev, selected]);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Delivery Units">Delivery Units</option>
            <option value="Sales Units">Sales Units</option>
            <option value="Supervision Units">Supervision Units</option>
          </select>
          <div className="flex flex-wrap mt-3">
            {selectedUnitCategories?.map((cat) => (
              <span
                key={cat}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                onClick={() =>
                  setSelectedUnitCategories((prev) =>
                    prev.filter((item) => item !== cat)
                  )
                }
              >
                {cat} &times;
              </span>
            ))}
          </div>
        </div>

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
              onClick={() => {
                if (
                  branchInput.trim() &&
                  !branches.includes(branchInput.trim())
                ) {
                  setBranches((prev) => [...prev, branchInput.trim()]);
                  setBranchInput("");
                }
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-3">
            {branches?.map((branch) => (
              <span
                key={branch}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                onClick={() =>
                  setBranches((prev) => prev.filter((item) => item !== branch))
                }
              >
                {branch} &times;
              </span>
            ))}
          </div>
        </div>

        {categories?.map((category) => (
          <div key={category.id} className="mb-6">
            {category?.questions?.map((question) => (
              <Question
                key={question.id}
                question={question}
                updateQuestion={(updatedData) =>
                  updateQuestion(category.id, question.id, updatedData)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistForm;
