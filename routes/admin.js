import express from "express";
import {
  getAllClosedTickets,
  getAllOpenTickets,
  getAllResolvedTickets,
  getAllTickets,
  updateTickets,
} from "../controllers/ticket.js";

const router = express.Router();

// get all Tickets
router.get("/all-tickets", async (req, res) => {
  try {
    const Tickets = await getAllTickets();
    if (!Tickets) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: Tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// get all open Tickets
router.get("/all-open-tickets", async (req, res) => {
  try {
    const Tickets = await getAllOpenTickets();
    if (!Tickets) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: Tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// get all resolved Tickets
router.get("/all-resolved-tickets", async (req, res) => {
  try {
    const Tickets = await getAllResolvedTickets();
    if (!Tickets) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: Tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// get all closed Tickets
router.get("/all-closed-tickets", async (req, res) => {
  try {
    const Tickets = await getAllClosedTickets();
    if (!Tickets) {
      return res.status(404).json({ error: "No Content Available." });
    }
    res.status(200).json({ data: Tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// edit the ticket for solution
router.put("/solution/:id", async (req, res) => {
  try {
    const updatedTickets = await updateTickets(req);
    if (!updatedTickets) {
      return res
        .status(400)
        .json({ error: "Error occurred while updating the data." });
    }
    res.status(200).json({
      data: updatedTickets,
      message: "Ticket saved successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

export const adminRouter = router;
