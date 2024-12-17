import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../UI/Sidebar";
import DashboardNav from "../UI/DashboardNav";
import GeneralNavBar from "../UI/GeneralNavBar";
// import DashboardHeader from "../components/Header";

const DashboardLayout = () => {
  const location = useLocation();

  // Check if the current page is the Dashboard
  const isDashboardPage = location.pathname === "/";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Render Different NavBars */}
        {isDashboardPage ? <DashboardNav /> : <GeneralNavBar />}

        {/* Dynamic Header */}
        {/* <DashboardHeader
          heading={"this is first Heading"}
          paragraph="this is paragraph"
          bannerTitle={currentHeader.title}
          bannerDescription={currentHeader.description}
          bannerImage={currentHeader.image}
        /> */}

        {/* Page Content */}
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
