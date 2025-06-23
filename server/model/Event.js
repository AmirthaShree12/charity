const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
    time: String,
    location: String,
    type: String,
    maxAttendees: String,
    image: String,      
    price: String       
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);