import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { name: "ONGOING", path: "/events/ongoing" },
  { name: "UPCOMING", path: "/events/upcoming" },
  { name: "PAST", path: "/events/past" },
];

const EventsHeader = () => {
  const { pathname } = useLocation();
  const isEventsAllTab =
    pathname === "/" || pathname === "/events" || pathname === "/events/all";

  return (
    <nav className="events-header">
      <NavLink
        to="/events"
        className={`events-tab ${isEventsAllTab ? "events-active" : ""}`}
      >
        ALL
      </NavLink>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `events-tab ${isActive ? "events-active" : ""}`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default EventsHeader;
