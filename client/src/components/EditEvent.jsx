import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";

function EditEvent() {
  const { id } = useParams(); // ✅ get event id from URL
  const navigate = useNavigate();
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const found = events.find(e => String(e.id) === String(id)); // string comparison for safety
    if (!found) {
      alert("Event not found.");
      navigate("/");
    } else {
      setEventToEdit(found);
    }
  }, [id, navigate]);

  const handleUpdate = (updatedEvent) => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = allEvents.map((e) =>
      String(e.id) === String(updatedEvent.id) ? updatedEvent : e
    );
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    navigate("/");
  };

  return (
    <div className="p-4">
      {eventToEdit ? (
        <EventForm onSave={handleUpdate} selectedEvent={eventToEdit} />
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
}

export default EditEvent;
