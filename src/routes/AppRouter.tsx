import { Route, Routes } from "react-router-dom";

import Auth from "../features/auth/Auth";
import Cars from "../pages/Cars";
import Crew from "../pages/Crew";
import NewEvent from "../pages/events/NewEvent";
import ProtectedLayout from "./ProtectedLayout";
import Events from "../pages/events/Events";
import EventsLayout from "../pages/events/EventsLayout";

const AppRouter = () => (
  <>
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route element={<ProtectedLayout />}>
        <Route element={<EventsLayout />}>
          <Route path="/" element={<Events filter="all" />} />
          <Route path="/events" element={<Events filter="all" />} />
          <Route path="/events/all" element={<Events filter="all" />} />
          <Route path="events/ongoing" element={<Events filter="ongoing" />} />
          <Route
            path="events/upcoming"
            element={<Events filter="upcoming" />}
          />
          <Route path="events/past" element={<Events filter="past" />} />
        </Route>
        <Route path="events/new" element={<NewEvent />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/crew" element={<Crew />} />
      </Route>
    </Routes>
  </>
);

export default AppRouter;
