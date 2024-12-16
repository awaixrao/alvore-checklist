import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Panel from "./pages/PanelPage/Panel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Panel />} />
        <Route path="panel" element={<Panel />} />
      </Route>
    </Routes>
  );
}

export default App;
