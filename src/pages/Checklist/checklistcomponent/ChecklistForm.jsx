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
  handleUploadImage, // Accept the function as a prop

  questions, // Add this
  setQuestions, // Add this if required for updates
}) => {
  const [selectedUnitCategories, setSelectedUnitCategories] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState("");

  // Update this query to match the pattern used in Settings and Units
  const { data: categoriesResponse } = useGetQuery({
    path: "vehicle-category/get",
  });
  const vehicleCategories = Array.isArray(categoriesResponse) ? categoriesResponse : [];

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
      
      // Map category names to their IDs when loading existing checklist
      const categoryIds = editingChecklist?.categories?.map(categoryName => {
        const category = vehicleCategories.find(c => c.categoryname === categoryName);
        return category?._id;
      }).filter(id => id); // Remove any undefined values
      
      setSelectedUnitCategories(categoryIds || []);
      setSelectedBranches(
        editingChecklist?.branches?.map((branch) => branch.branchCode) || []
      );

      console.log("Rendering ChecklistForm with categories:", categories);
      categories.forEach((cat) => {
        console.log(
          `Rendering category: ${cat.name} with questions:`,
          cat.questions
        );
      });

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
  }, [editingChecklist, setCategories, vehicleCategories]);

  // Sync state with checklistPost
  useEffect(() => {
    // Map selected category IDs to category objects
    const selectedCategories = selectedUnitCategories.map(categoryId => {
      const category = vehicleCategories.find(c => c._id === categoryId);
      return category;
    }).filter(category => category); // Remove any undefined values

    setChecklistPost((prev) => ({
      ...prev,
      title: checklistTitle,
      categories: selectedCategories, // Pass complete category objects
      branches: selectedBranches,
    }));
  }, [
    checklistTitle,
    selectedUnitCategories,
    selectedBranches,
    setChecklistPost,
    vehicleCategories,
  ]);
  useEffect(() => {
    console.log("Categories passed to ChecklistForm:", categories);
  }, [categories]);

  useEffect(() => {
    if (editingChecklist) {
      const mappedCategories = editingChecklist.categories?.map(
        (cat, index) => {
          const categoryQuestions = editingChecklist.questions?.filter(
            (q) => q.category === cat
          );
          return {
            id: index,
            name: cat,
            questions: categoryQuestions || [],
          };
        }
      );

      setCategories(mappedCategories || []);
    }
  }, [editingChecklist]);

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
            {vehicleCategories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.categoryname}
              </Select.Option>
            ))}
          </Select>
          <div className="flex flex-wrap mt-3">
            {selectedUnitCategories?.map((catId) => {
              const category = vehicleCategories.find(c => c._id === catId);
              return (
                <span
                  key={catId}
                  className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg mr-2 mb-2 cursor-pointer"
                  onClick={() =>
                    setSelectedUnitCategories((prev) =>
                      prev.filter((item) => item !== catId)
                    )
                  }
                >
                  {category?.categoryname || catId} &times;
                </span>
              );
            })}
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
        {questions?.map((question) => (
          <Question
            key={question.id}
            question={question}
            onUploadImage={handleUploadImage} // Pass it down to Question
            updateQuestion={(updatedData) =>
              setQuestions((prev) =>
                prev.map((q) =>
                  q.id === question.id ? { ...q, ...updatedData } : q
                )
              )
            }
            onRemove={() =>
              setQuestions((prev) => prev.filter((q) => q.id !== question.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistForm;
