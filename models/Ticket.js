import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Resolved", "Closed"],
    default: "Open",
  },
  feedback: {
    type: String,
  },
  message: {
    type: String,
  },
  studentMsg: {
    type: String,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export { Ticket };
