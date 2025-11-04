import express from "express";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// Route to get messages
router.get("/:id", authMiddleware, getAllMessages);
router.post("/send/:id", authMiddleware, sendMessage);

export default router;
