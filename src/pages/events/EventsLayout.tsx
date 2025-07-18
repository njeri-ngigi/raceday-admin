import "./Events.css";
import EventsHeader from "../../components/EventsHeader";
import { Outlet } from "react-router-dom";

export default function EventsLayout() {
  return (
    <div className="events-layout">
      <EventsHeader />
      <Outlet/>
    </div>
  );
}
