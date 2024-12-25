import React from "react";
import Question from "./Questions";

const ChecklistForm = ({ categories, setCategories }) => {
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

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md"
        >
          {/* Main Heading */}

          {/* Category Title Field */}
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
    </div>
  );
};

export default ChecklistForm;
