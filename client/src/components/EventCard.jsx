import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${event.id}`);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-sm text-gray-500">{event.date}</p>
      <p className="mt-2">{event.description}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={handleEdit} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={() => onDelete(event.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

export default EventCard;
