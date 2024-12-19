import { useState } from "react";
import AnswerTypeSelector from "./AnswerTypeSelector";

const QuestionItem = ({ question, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleLabelChange = (e) => {
    onUpdate(question.id, { label: e.target.value });
  };

  return (
    <div className="bg-gray-50 shadow rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        {/* Editable Question Label */}
        {isEditing ? (
          <input
            type="text"
            value={question.label}
            onChange={handleLabelChange}
            className="w-full px-2 py-1 border rounded-md"
            placeholder="Enter Inspection Item Label"
          />
        ) : (
          <p className="text-lg font-medium">{question.label}</p>
        )}

        {/* Edit/Remove Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 text-sm"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => onRemove(question.id)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Answer Type Selector */}
      <AnswerTypeSelector
        selectedType={question.answerType}
        onSelectType={(type) => onUpdate(question.id, { answerType: type })}
      />
    </div>
  );
};

export default QuestionItem;
