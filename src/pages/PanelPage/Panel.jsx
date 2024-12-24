import DashboardSectionFive from "./panelcomponents/DashboardSectionFive";
import DashboardSectionFour from "./panelcomponents/DashboardSectionFour";
import DashboardSectionOne from "./panelcomponents/dashboardSectionOne";
import DashboardSectionSix from "./panelcomponents/DashboardSectionSix";
import DashboardSectionThree from "./panelcomponents/DashboardSectionThree";
import DashboardSectionTwo from "./panelcomponents/DashboardSectionTwo";
import DashboardHeader from "../../UI/Header";
import DashboardSectionSeven from "./panelcomponents/DashoardSectionSeven";
import DashboardSectionEight from "./panelcomponents/DashboardSectionEight";
import panelimg from "../../assets/panelimg.png";

const Panel = () => {
  return (
    <>
      <DashboardHeader image={panelimg} />
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
          <DashboardSectionSeven />
          <DashboardSectionEight />
        </div>
      </div>
    </>
  );
};

export default Panel;
