import { useState } from "react";
import QuestionItem from "./checklistcomponent/QuestionItem";
import AnswerTypeSelector from "./checklistcomponent/AnswerTypeSelector";

const ChecklistPage = () => {
  const [questions, setQuestions] = useState([]);

  // Function to add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        label: "",
        answerType: null,
      },
    ]);
  };

  // Function to update a question
  const updateQuestion = (id, updatedData) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, ...updatedData } : q))
    );
  };

  // Function to remove a question
  const removeQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-xl font-bold mb-4">Create Checklist</h1>
        <p className="text-sm text-gray-500 mb-6">
          Use selects if you want to add questions and answers.
        </p>

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-6 hover:bg-blue-600"
        >
          Add Question
        </button>

        {/* Questions Section */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdate={updateQuestion}
            onRemove={removeQuestion}
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistPage;
