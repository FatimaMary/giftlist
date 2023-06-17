import express from 'express';
import { 
    postParticipant,
    getAllParticipants,
    getParticipantsByEventId,
} from '../controllers/participants.js';

const router = express.Router();

router.post("/post", postParticipant);
router.get("/all", getAllParticipants);
router.get("/:eventId", getParticipantsByEventId);

export default router;