import React, { useState } from "react";
import DashboardHeader from "../../UI/Header";
import checklistimg from "../../assets/checklistimg.png";

const ChecklistPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const answerTypes = [
    { value: "text", label: "Fill In Space (Text)" },
    { value: "dropdown", label: "Drop Down Answer" },
    { value: "multiple_choice", label: "Multiple Choice" },
    { value: "upload_image", label: "Upload Image" },
    { value: "take_picture", label: "Take Picture" },
    { value: "select_date", label: "Select Date" },
    { value: "signature", label: "Signature" },
  ];

  // Function to add a new category
  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: "",
        questions: [],
      },
    ]);
  };

  // Function to update a category
  const updateCategory = (id, updatedData) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === id ? { ...cat, ...updatedData } : cat
      )
    );
  };

  // Function to add a question to a category
  const addQuestion = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: [
                ...cat.questions,
                { id: Date.now(), label: "", answerType: null, options: [] },
              ],
            }
          : cat
      )
    );
  };

  // Function to update a question
  const updateQuestion = (categoryId, questionId, updatedData) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
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

  // Function to remove a category
  const removeCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== id)
    );
    if (selectedCategoryId === id) setSelectedCategoryId(null);
  };

  // Function to remove a question
  const removeQuestion = (categoryId, questionId) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.filter((q) => q.id !== questionId),
            }
          : cat
      )
    );
    if (selectedQuestionId === questionId) setSelectedQuestionId(null);
  };

  // Function to handle answer type selection
  const selectAnswerType = (categoryId, questionId, type) => {
    updateQuestion(categoryId, questionId, { answerType: type, options: [] });
  };

  return (
    <>
      <DashboardHeader image={checklistimg} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Create Checklist</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Checklist
            </button>
          </div>

          <div>
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 shadow rounded-md p-4 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      updateCategory(category.id, { name: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded-md"
                    placeholder="Enter Category Name"
                  />
                  <button
                    onClick={() => removeCategory(category.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove Category
                  </button>
                </div>

                <div className="ml-4">
                  {category.questions.map((question) => (
                    <div
                      key={question.id}
                      className={`bg-white shadow rounded-md p-4 mb-4 border ${
                        selectedQuestionId === question.id
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedQuestionId(question.id)}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <input
                          type="text"
                          value={question.label}
                          onChange={(e) =>
                            updateQuestion(category.id, question.id, {
                              label: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border rounded-md"
                          placeholder="Enter Question Label"
                        />
                        <button
                          onClick={() =>
                            removeQuestion(category.id, question.id)
                          }
                          className="text-red-500 text-sm"
                        >
                          Remove Question
                        </button>
                      </div>

                      <div className="ml-4">
                        <p className="text-sm mb-2">
                          Selected Answer Type: {question.answerType || "None"}
                        </p>
                        {question.answerType === "multiple_choice" && (
                          <div>
                            <p className="text-sm font-medium">Options:</p>
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-2"
                              >
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const updatedOptions = [
                                      ...question.options,
                                    ];
                                    updatedOptions[index] = e.target.value;
                                    updateQuestion(category.id, question.id, {
                                      options: updatedOptions,
                                    });
                                  }}
                                  className="w-full px-2 py-1 border rounded-md"
                                  placeholder={`Option ${index + 1}`}
                                />
                                <button
                                  onClick={() => {
                                    const updatedOptions =
                                      question.options.filter(
                                        (_, i) => i !== index
                                      );
                                    updateQuestion(category.id, question.id, {
                                      options: updatedOptions,
                                    });
                                  }}
                                  className="ml-2 text-red-500 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const updatedOptions = [
                                  ...question.options,
                                  "",
                                ];
                                updateQuestion(category.id, question.id, {
                                  options: updatedOptions,
                                });
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              Add Option
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addQuestion(category.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addCategory}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChecklistPage;
