/* eslint-disable no-unused-vars */

import Home from "./features/home";
import UnpaidJobs from "./features/jobs/UnpaidJobs";
import BestProfession from "./features/admin/BestProfession";
import BestClients from "./features/admin/BestClients";
import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./components";

const Index = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<UnpaidJobs />} />
      <Route path="/best-profession" element={<BestProfession />} />
      <Route path="/best-clients" element={<BestClients />} />
    </Route>
  </Routes>
);

export default Index;
