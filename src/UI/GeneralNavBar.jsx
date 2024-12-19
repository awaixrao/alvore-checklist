import { FiSearch, FiBell, FiUser, FiHelpCircle, FiPlus } from "react-icons/fi";

const GeneralNavBar = () => {
  return (
    <header className="flex items-center sm:px-10 sm:pt-4 justify-between px-3 py-2 bg-white shadow-md">
      {/* Search Bar */}
      <div className="relative w-1/2 sm:w-1/3 lg:w-1/4">
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 lg:py-3 focus-within:ring-2 focus-within:ring-blue-500">
          <FiSearch size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Fleetio"
            className="w-full text-sm lg:text-base text-gray-700 focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-3 lg:space-x-6">
        <FiUser
          size={18} // Larger size for desktop
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiBell
          size={18}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiHelpCircle
          size={18}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
        <FiPlus
          size={18}
          className="text-gray-600 cursor-pointer hover:text-gray-800"
        />
      </div>

      {/* Toggle Button Placeholder (Mobile Only) */}
      <div className="flex items-center justify-end sm:hidden">
        <div className="w-6 h-6 flex flex-col justify-between cursor-pointer"></div>
      </div>
    </header>
  );
};

export default GeneralNavBar;
