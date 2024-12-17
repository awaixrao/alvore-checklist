const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
        {/* Celebration Icon */}
        <div className="mb-4 flex justify-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/6166/65ea/bfe65ee91c188bff2277be6e4ac4a07e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gMr95414dXWjmcjxXUG5Ga-EAbZKswHGW-IlBht3V3VgHgzQ4iJc0vkj3Db41d9eLFQ6EC9Po0HTYsSr8wQghdBcdOK4dCMgFQPhjwwl4NXcv-zonY-9XGOxPevUMjghnWlCLtmBt8pZgmSfqqM~A1P2C8v-9OuXuv2EhLbv0qhY4V141gSoa61QbGhWzkFOD3nrWY8MI4ydMLyKyEvFHjICgzt7RBDPXjXKfJVbyZIrOj7kZxctLbOL7HvusIgYfKlCM1sUXclV06ac4gbtYXsMiPzTnceC6Jih5B-OejR3Bhz-CA4o7TcwRvACfzvZHJDU11JC1GAn728DRBELFg__" // Replace with your permanent image URL
            alt="Celebration Icon"
            className="w-20 h-20"
          />
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
