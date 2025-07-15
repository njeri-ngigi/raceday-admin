import { Routes, Route } from "react-router-dom";
import Auth from "../features/auth/Auth";
import Home from "../features/home/Home";
import ProtectedLayout from "./ProtectedLayout";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Auth />} />
    <Route element={<ProtectedLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
);

export default AppRouter;
