import { Ticket } from "../models/Ticket.js";

export function getUserDetails(req) {
  return req.user;
}

export function getAllTickets() {
  return Ticket.find().populate("student");
}

export function getAllOpenTickets() {
  return Ticket.find({ status: "Open" }).populate("student");
}

export function getAllResolvedTickets() {
  return Ticket.find({ status: "Resolved" }).populate("student");
}

export function getAllClosedTickets() {
  return Ticket.find({ status: "Closed" }).populate("student");
}

export function getUserTickets(req) {
  return Ticket.find({ student: req.user._id }).populate("student");
}

export function deteleTicket(req) {
  return Ticket.findByIdAndDelete({
    _id: req.params.id,
  });
}

export function updateTickets(req) {
  return Ticket.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
}

export function postNewTickets(req) {
  const postedDate = new Date().toJSON().slice(0, 10);
  return new Ticket({
    ...req.body,
    student: req.user._id,
    date: postedDate,
    message: "No Solution Found",
  }).save();
}

export function postFeedbackTicket(req) {
  const postedDate = new Date().toJSON().slice(0, 10);
  return new Ticket({
    ...req.body,
    student: req.user._id,
    date: postedDate,
  }).save();
}
