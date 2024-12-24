import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { TbFileSettings } from "react-icons/tb";
import { FiMapPin, FiMenu, FiX, FiLogOut } from "react-icons/fi"; // Toggle icons
import { LuLayoutPanelLeft } from "react-icons/lu";
import { VscChecklist } from "react-icons/vsc";
import { logout } from "../features/AuthSlice/authSlice"; // Import logout action
import { persistor } from "../store/store"; // Import persistor
import { FaCar } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
  const [showToggle, setShowToggle] = useState(true); // Toggle visibility state
  const [isModalVisible, setIsModalVisible] = useState(false); // Logout modal state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle scroll event to hide/show toggle button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowToggle(false); // Hide toggle button after scrolling 50px
      } else {
        setShowToggle(true); // Show toggle button when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Dispatch logout action
      dispatch(logout());

      // Purge persistor to clear persisted state
      await persistor.purge();

      // Remove token from local storage (if used)
      localStorage.removeItem("token");

      // Show success message and navigate to login
      message.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="relative">
      {/* Toggle Button (Right Side) */}
      {showToggle && (
        <button
          className="fixed top-4 right-4 z-50 md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 z-40`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center py-6">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKZTidnVfaYwkVFIt75yiLD1WhcMWXQrGF7Hy30HGOreMR2xHqFZ8mAIfmqyrKoRURKsc-4gbQdlKxSB~cda4STWQyLqgrJ3eU394gUi9eKNxhF51f1XIjp4CtTMC3N73T2~6T1B5WiQojukGvhBHLrIlIbNqaH7ue-aKiHdeerZdfGQIj4aFF6MmwQotpSCqB5-DvrCVtHEbzunuo42aG45sRtz6ijQoKe3oU2~-Onu4vEanNZMj4eJRabstVuSBL~8ksu2Wp~4O2LFM7aVqgBVk5qFDMgXzA0VUprNTGS1fpeTxfww0McJO1l7t-bHNPP3lHj22--SNpjbxwG0Sw__"
            alt="Logo"
            className="w-32"
          />
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <LuLayoutPanelLeft size={20} />
                <span>PANEL</span>
              </Link>
            </li>
            <li>
              <Link
                to="/branches"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <TbFileSettings size={20} />
                <span>BRANCHES</span>
              </Link>
            </li>
            <li>
              <Link
                to="/units"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <FaCar size={20} />

                <span>UNITS</span>
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/8b8e/4ca8/71aca42a0e316406c8f99c5931cbcc4e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PbaRk5B-IX1GtpyC78LqRWKQPI4UiD4-OqKcpSBjZqGa9WAfWZPaNoPNsWl-4omdtrFpZskeK3rqXANbNjJyMnj741mZYEnmMhVwkJYhXQ7XZ7u~f8fZ2gRc3MmmdThIGsLOGLIMZGDKMsqKQisB4nj7SobcLOkSrZRjMYJotUxZybjDj9tm9fFjhF23TJVtz00HLmlpd7HVxMyjSZsN0UMMNdDkoiDECnpjr0vpHSsvl8WrU6WDLvWsF3p~ZeDPHRHuXq6cdIrGfNBDYMUSFpyMYLkN1cbkJejQirdDchpQP20XBzhPnMMe48dnzgNFcOn50CI8pS360koHRjaHyg__"
                  alt="Users Icon"
                  className="w-6 h-6"
                />
                <span>USERS</span>
              </Link>
            </li>
            <li>
              <Link
                to="/routes"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <FiMapPin size={20} />
                <span>ROUTES</span>
              </Link>
            </li>
            <li>
              <Link
                to="/checklist"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <VscChecklist size={20} />
                <span>CHECKLIST</span>
              </Link>
            </li>

            {/* Logout Option */}
            <li>
              <button
                onClick={() => setIsModalVisible(true)}
                className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-100 hover:text-red-600"
              >
                <FiLogOut size={20} />
                <span>LOGOUT</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Logout"
        cancelText="Cancel"
        centered
      >
        <p>Are you sure you want to logout?</p>
      </Modal>

      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)} // Close sidebar when overlay is clicked
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
