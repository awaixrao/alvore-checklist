import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { useGetQuery } from "../../../services/apiService";
import { Select, Spin } from "antd";

const ChecklistForm = ({
  categories,
  setCategories,
  setChecklistPost,
  checklistPost,
  editingChecklist,
}) => {
  const [selectedUnitCategories, setSelectedUnitCategories] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState("");

  const { data: branchData, isLoading } = useGetQuery({
    path: "branch/get_all",
  });

  // Populate form fields when editingChecklist changes
  // useEffect(() => {
  //   if (editingChecklist) {
  //     setChecklistTitle(editingChecklist?.title || "");
  //     setSelectedUnitCategories(editingChecklist?.categories || []);
  //     setBranches(
  //       editingChecklist?.branches?.map((branch) => branch.branchCode) || []
  //     );
  //     setCategories(
  //       editingChecklist?.categories?.map((cat, index) => ({
  //         id: index,
  //         name: cat,
  //         questions:
  //           editingChecklist?.questions?.filter(
  //             (question) => question.category === cat
  //           ) || [],
  //       })) || []
  //     );
  //   }
  // }, [editingChecklist, setCategories]);

  useEffect(() => {
    if (editingChecklist) {
      setChecklistTitle(editingChecklist?.title || "");
      setSelectedUnitCategories(editingChecklist?.categories || []);
      setSelectedBranches(
        editingChecklist?.branches?.map((branch) => branch.branchCode) || []
      );

      // Map categories with questions
      const mappedCategories = editingChecklist?.categories?.map(
        (cat, index) => {
          const categoryQuestions =
            editingChecklist?.questions?.filter(
              (question) => question.category === cat
            ) || [];
          return {
            id: index,
            name: cat,
            questions: categoryQuestions.map((question, qIndex) => ({
              id: qIndex,
              label: question?.label || "",
              answerType: question?.answerType,
              isRequired: question?.isRequired || false,
              choices: question?.choices || [],
              instruction: question?.instruction || "",
            })),
          };
        }
      );

      setCategories(mappedCategories);

      console.log("categories", categories);
    }
  }, [editingChecklist, setCategories]);

  console.log("checklistTitle", checklistTitle);
  console.log("branches", branches);
  console.log("branchInput", branchInput);
  console.log("selectedUnitCategories", selectedUnitCategories);
  console.log("editingChecklist", editingChecklist);

  // Sync state with checklistPost
  useEffect(() => {
    setChecklistPost((prev) => ({
      ...prev,
      title: checklistTitle,
      categories: selectedUnitCategories,
      branches: selectedBranches, // Ensure selected branches are synced
    }));
  }, [
    checklistTitle,
    selectedUnitCategories,
    selectedBranches,
    setChecklistPost,
  ]);

  // const updateQuestion = (categoryId, questionId, updatedData) => {
  //   setCategories((prev) =>
  //     prev.map((cat) =>
  //       cat.id === categoryId
  //         ? {
  //             ...cat,
  //             questions: cat.questions.map((q) =>
  //               q.id === questionId ? { ...q, ...updatedData } : q
  //             ),
  //           }
  //         : cat
  //     )
  //   );
  // };

  const handleRemoveQuestion = (categoryId, questionId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              questions: category.questions.filter(
                (question) => question.id !== questionId
              ),
            }
          : category
      )
    );
  };

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
          <Select
            mode="multiple"
            placeholder="Select categories"
            value={selectedUnitCategories}
            onChange={(value) => setSelectedUnitCategories(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Delivery Units">Delivery Units</Select.Option>
            <Select.Option value="Sales Units">Sales Units</Select.Option>
            <Select.Option value="Supervision Units">
              Supervision Units
            </Select.Option>
          </Select>
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
            Select Branches
          </label>
          <Select
            mode="multiple"
            placeholder="Select branches"
            value={selectedBranches}
            onChange={(value) => setSelectedBranches(value)}
            style={{ width: "100%" }}
            loading={isLoading}
          >
            {branchData?.data?.map((branch) => (
              <Select.Option key={branch.branchCode} value={branch.branchCode}>
                {branch.branchCode}
              </Select.Option>
            ))}
          </Select>
          <div className="flex flex-wrap mt-3">
            {selectedBranches?.map((branch) => (
              <span
                key={branch}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                onClick={() =>
                  setSelectedBranches((prev) =>
                    prev.filter((item) => item !== branch)
                  )
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
                onRemove={() => handleRemoveQuestion(category.id, question.id)} // Pass the function here
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistForm;
