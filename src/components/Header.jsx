import { FiUser, FiGrid } from "react-icons/fi";
import { MdViewCompact } from "react-icons/md";

const DashboardHeader = () => {
  return (
    <>
      {/* Header Section */}
      <header className="flex flex-wrap items-center justify-between px-4 py-4 bg-white shadow-md md:px-6">
        {/* Left Section: Dashboard Title */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            My Dashboard
          </h1>
          <span className="text-gray-500 cursor-pointer">▼</span>
          <FiUser size={18} className="text-gray-500 cursor-pointer" />
        </div>

        {/* Right Section: Dropdown and Buttons */}
        <div className="flex flex-wrap items-center space-x-4">
          {/* Dropdown: All Groups */}
          <div className="relative w-full sm:w-48">
            <select className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Groups</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Compact Button */}
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            <MdViewCompact size={16} className="mr-2" />
            Compact
          </button>

          {/* Manage Widgets Button */}
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            <FiGrid size={16} className="mr-2" />
            Manage Widgets
            <span className="ml-1 text-gray-500">▼</span>
          </button>
        </div>
      </header>

      {/* Administration Panel Section */}
      <div className="px-4 py-4 mt-4 rounded-lg mx-6 bg-blue-600 text-white flex flex-col md:flex-row justify-between items-center md:px-8">
        {/* Left Text */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-base md:text-lg font-semibold">
            🌟 ADMINISTRATION PANEL
          </h2>
          <p className="text-sm mt-1 opacity-90 leading-relaxed">
            Designed For Administrators Or Management Users Who Require
            Comprehensive Access To Monitor,
            <br className="hidden md:inline" /> Manage And Control Various
            Aspects Of The System.
          </p>
        </div>

        {/* Right Illustration */}
        <img
          src="https://s3-alpha-sig.figma.com/img/4420/12a8/f0c9837b48f43db3d5418ac00ad2a067?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R4nZyLmGbQH3shEb-oYixp~oZY-xVgTBWR5ZwqtUFH1EvRz3drADVGoamikYfH0H9uHT2z7vaTMBzfkfhU-W4nC2~Ld-Padh6UxhSqK5YNl1LHpr7RyFn~dXePPqXHOASapaz~vmdRy5TtGi~1vx8Fjv-7yhjcpGWUVgh0ekZaJUCid84eQEz6EkDrIM8RuG0Pm23aW5cSfbqOyQ-BujdirbfdZoCycFgaCE3MpVL9XrfpDTLMaPE0cLyQLtR0ghbPNYPL9frTHyX9skpNAQrVfnwNhBPZYGsF7aNZzEVCn7jQd8gkehWRQN4d0uU7ce8NivL7Fs8DP0gVqWAHGuOw__"
          alt="Administration Panel"
          className="w-32 h-20 md:w-[120px] md:h-[80px] object-cover"
        />
      </div>
    </>
  );
};

export default DashboardHeader;
