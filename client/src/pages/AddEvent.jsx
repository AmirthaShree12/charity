import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

function AddEvent() {
  const navigate = useNavigate();

  const handleAdd = (event) => {
    const existing = JSON.parse(localStorage.getItem("events")) || [];
    const updated = [...existing, event];
    localStorage.setItem("events", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div>
      <EventForm onAdd={handleAdd} />
    </div>
  );
}

export default AddEvent;
