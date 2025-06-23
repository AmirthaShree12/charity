import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ onAdd, onSave, selectedEvent = null, onCancel = () => {} }) => {
  const [event, setEvent] = useState({ title: '', date: '', description: '' });

  useEffect(() => {
    if (selectedEvent) {
      setEvent(selectedEvent);
    } else {
      setEvent({ title: '', date: '', description: '' });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...event, id: selectedEvent?.id || Date.now() };

    if (selectedEvent && typeof onSave === 'function') {
      onSave(newEvent);
    } else if (!selectedEvent && typeof onAdd === 'function') {
      onAdd(newEvent);
      setEvent({ title: '', date: '', description: '' });
    } else {
      console.error("No valid handler provided (onAdd or onSave)");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        {selectedEvent ? 'Edit Event' : 'Add New Event'}
      </h2>

      <input
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Title"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />

      <textarea
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Description"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {selectedEvent ? 'Update' : 'Add'}
        </button>

        {selectedEvent && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

EventForm.propTypes = {
  onAdd: PropTypes.func,
  onSave: PropTypes.func,
  selectedEvent: PropTypes.object,
  onCancel: PropTypes.func,
};

export default EventForm;
