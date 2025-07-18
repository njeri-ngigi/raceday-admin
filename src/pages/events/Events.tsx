import { Link } from "react-router-dom";
import "./Events.css";

interface EventsProps {
  filter: "all" | "ongoing" | "upcoming" | "past";
}

export default function Events({ filter }: EventsProps) {
  return (
    <div className="events-container">
      <div className="events">
        <h1>Events Page</h1>
        <p>This is the content for the {filter} events page.</p>
      </div>
      <Link className="create-event-btn" to="/events/new">
        CREATE A NEW EVENT
      </Link>
    </div>
  );
}
