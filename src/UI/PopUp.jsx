import celebrate from "../assets/celebration.png";

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
        {/* Celebration Icon */}
        <div className="mb-4 flex justify-center">
          <img src={celebrate} alt="Celebration Icon" className="w-20 h-20" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your data has been saved successfully.
        </p>

        {/* Button */}
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded"
          onClick={onClose}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Popup;
