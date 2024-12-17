import { useState } from "react";
import { Link } from "react-router-dom";
import { TbFileSettings } from "react-icons/tb";
import { FiMapPin, FiMenu, FiX } from "react-icons/fi"; // Toggle icons
import { LuLayoutPanelLeft } from "react-icons/lu";
import { VscChecklist } from "react-icons/vsc";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  return (
    <div className="relative">
      {/* Toggle Button (Right Side) */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 z-40`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center py-6">
          <img
            src="https://s3-alpha-sig.figma.com/img/906b/c7ba/0245aec5f7480e8e14edaade481def72?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KX9gp~eDZdSer31mhl67upYuJcPaeY5FcyEIwPt5c7Hun21-KryDV4PBvZtMSXvPIh~vMMFOKdmzWwcfkYomEl~y2Re2eHv~eH4GjFEHJjFov9Vexquzos0RqfCBxpbthnvfGAY5mMtWheDzA9gLwrs0AhyNLFG8NdeqwRIQNPdcaqblsyF8j48b~U1DX2bHcpV8gIiL6LlFZfP4vS4ZdeIvHPK9pTGyuOzU-V4FCsOERSN1QiiHuAIPGowgo3lCTFuNMsgaOSeE-NSeoYf4l8ZVXo3dIxw1TRgb9GKNYD2EtIzkIesRahb5TSCNZLUV8nmzCys6CD~GqLuj2DCSfg__"
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
                <img
                  src="https://s3-alpha-sig.figma.com/img/196e/89b5/46232902ca8c126b013239ce0657d96d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ba0ex4c8FxUhH77ZHkZ89kGgZAqeF090Nyh26w0~17Sj6Xf4sNAuEOFLfqvvT6yPy90xaCwoVEZ87vYnj0D1jvzG2qWR~VLhxcg-rqyXesw~LEmljg2KuLXMHZd7vZ-w7EtlJL2ALisQflJazMaS6ZSgJqdzJpj6aZ7tNCp7ChY058In6UvYtjMIdu0L8HTS73hD1ItHlTru~vczUE1GPqYEE9dOOxv0L7OnBWeTrQL6u~rWVYdjL3FwI9mASnfpRdxq-3q6G4qBpKLvo6XkXCjyH6nvxggJwMARrN00j2gLumV6lYSrw68XrbdQFM1GhOsNbZ71uFP3TgGDWIzJ8A__"
                  alt="Units Icon"
                  className="w-6 h-6"
                />
                <span>UNITS</span>
              </Link>
            </li>

            <li>
              <Link
                to="/units"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/8b8e/4ca8/71aca42a0e316406c8f99c5931cbcc4e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PbaRk5B-IX1GtpyC78LqRWKQPI4UiD4-OqKcpSBjZqGa9WAfWZPaNoPNsWl-4omdtrFpZskeK3rqXANbNjJyMnj741mZYEnmMhVwkJYhXQ7XZ7u~f8fZ2gRc3MmmdThIGsLOGLIMZGDKMsqKQisB4nj7SobcLOkSrZRjMYJotUxZybjDj9tm9fFjhF23TJVtz00HLmlpd7HVxMyjSZsN0UMMNdDkoiDECnpjr0vpHSsvl8WrU6WDLvWsF3p~ZeDPHRHuXq6cdIrGfNBDYMUSFpyMYLkN1cbkJejQirdDchpQP20XBzhPnMMe48dnzgNFcOn50CI8pS360koHRjaHyg__"
                  alt="Units Icon"
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
          </ul>
        </nav>
      </aside>

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
