import DashboardSectionFive from "./panelcomponents/DashboardSectionFive";
import DashboardSectionFour from "./panelcomponents/DashboardSectionFoyr";
import DashboardSectionOne from "./panelcomponents/dashboardSectionOne";
import DashboardSectionSix from "./panelcomponents/DashboardSectionSix";
import DashboardSectionThree from "./panelcomponents/DashboardSectionThree";
import DashboardSectionTwo from "./panelcomponents/DashboardSectionTwo";
import DashboardHeader from "../../UI/Header";

const Panel = () => {
  return (
    <>
      <DashboardHeader />
      <div className="p-5 min-h-screen">
        <div className="max-w-7xl mx-auto ">
          {/* Dashboard Component */}
          <DashboardSectionOne />

          {/* DashboardCards Component */}
          <DashboardSectionTwo />
          <DashboardSectionThree />
          <DashboardSectionFour />
          <DashboardSectionFive />
          <DashboardSectionSix />
        </div>
      </div>
    </>
  );
};

export default Panel;
