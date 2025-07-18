import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const tabs = [
  { name: "CARS", path: "/cars" },
  { name: "CREW", path: "/crew" },
];

const Header = () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const isEventsAllTab = pathname.startsWith("/events") || pathname === "/";

  return (
    <nav className="header">
      <div className="site-title">RACE DAY ADMIN</div>
      <NavLink to="/events" className={`tab ${isEventsAllTab ? "active" : ""}`}>
        EVENTS
      </NavLink>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `tab ${isActive ? "active" : ""}`}
        >
          {tab.name}
        </NavLink>
      ))}
      <button onClick={logout}>LOGOUT</button>
    </nav>
  );
};

export default Header;
