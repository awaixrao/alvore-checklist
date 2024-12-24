// const answerTypes = [
//   { value: "text", label: "Fill In Space (Text)" },
//   { value: "dropdown", label: "Drop Down Answer" },
//   { value: "multiple_choice", label: "Multiple Choice" },
//   { value: "upload_image", label: "Upload Image" },
//   { value: "take_picture", label: "Take Picture" },
//   { value: "select_date", label: "Select Date" },
//   { value: "signature", label: "Signature" },
// ];

// const AnswerTypeSelector = ({ selectedType, onSelectType }) => {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium text-gray-600 mb-2">
//         Select Answer Type
//       </label>
//       <select
//         value={selectedType || ""}
//         onChange={(e) => onSelectType(e.target.value)}
//         className="px-3 py-2 border rounded-md"
//       >
//         <option value="" disabled>
//           Select Answer Type
//         </option>
//         {answerTypes.map((type) => (
//           <option key={type.value} value={type.value}>
//             {type.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default AnswerTypeSelector;
