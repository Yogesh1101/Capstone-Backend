import express from "express";
import {
  getUserDetails,
  deteleTicket,
  getUserTickets,
  postNewTickets,
  updateTickets,
} from "../controllers/ticket.js";
import { getUserById } from "../controllers/user.js";

const router = express.Router();

// get user details
router.get("/userDetails", async (req, res) => {
  try {
    const user = await getUserById(req);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// get all user tickets
router.get("/all", async (req, res) => {
  try {
    const tickets = await getUserTickets(req);
    if (!tickets) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// post new tickets
router.post("/add", async (req, res) => {
  try {
    const newTickets = await postNewTickets(req);
    if (!newTickets) {
      return res
        .status(400)
        .json({ error: "Error occurred while saving the data." });
    }
    res.status(201).json({
      data: newTickets,
      message: "Ticket saved successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// edit the Tickets
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedTickets = await updateTickets(req);
    if (!updatedTickets) {
      return res
        .status(400)
        .json({ error: "Error occurred while updating the data." });
    }
    res.status(200).json({
      data: updatedTickets,
      message: "Notes saved successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// delete the ticket
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteTicket = await deteleTicket(req);
    if (!deleteTicket) {
      return res
        .status(400)
        .json({ error: "Error occurred while deleting the data." });
    }
    res.status(200).json({
      message: "Ticket Deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

export const ticketRouter = router;
