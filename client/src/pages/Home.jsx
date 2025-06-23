import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(localEvents);
  }, []);

  const handleDelete = (id) => {
    const updated = events.filter((e) => e.id !== id);
    localStorage.setItem("events", JSON.stringify(updated));
    setEvents(updated);
  };

  const handleEdit = (event) => {
    localStorage.setItem("editEvent", JSON.stringify(event));
    navigate("/edit");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  );
}
