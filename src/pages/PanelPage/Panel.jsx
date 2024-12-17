import Dashboard from "./panelcomponents/dashboard";
import DashboardCards from "./panelcomponents/cards";

const Panel = () => {
  return (
    <div className="p-5 min-h-screen">
      {/* Container with unified width */}
      <div className="max-w-7xl mx-auto ">
        {/* Dashboard Component */}
        <Dashboard />

        {/* DashboardCards Component */}
        <DashboardCards />
      </div>
    </div>
  );
};

export default Panel;
