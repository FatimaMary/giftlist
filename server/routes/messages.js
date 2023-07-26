import express from "express";
import { postMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/add", postMessage);

export default router;
