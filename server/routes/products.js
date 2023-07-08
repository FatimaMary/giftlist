import express from "express";
import {
  postProduct,
  getAllProducts,
  getProductsByParticipantsId,
  getProductsByEventId,
} from "../controllers/participants.js";

const router = express.Router();

router.post("/add", postProduct);
router.get("/all", getAllProducts);
router.get("/all/:participantsId", getProductsByParticipantsId);
router.get("/details/:eventId", getProductsByEventId);

export default router;
