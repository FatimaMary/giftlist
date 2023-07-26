import express from "express";
import {
  postMessage,
  getAllMessages,
  getMessagesByEventId,
} from "../controllers/message.js";

const router = express.Router();

router.post("/add", postMessage);
router.get("/all", getAllMessages);
router.get("/all/:eventId", getMessagesByEventId);

export default router;
