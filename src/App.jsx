import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Panel from "./pages/PanelPage/Panel";
import Branches from "./pages/Branches/Branches";
import Units from "./pages/Units/Units";
import RoutesPage from "./pages/Routes/RoutesPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<DashboardLayout />}>
        <Route path="/" element={<Panel />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/units" element={<Units />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
