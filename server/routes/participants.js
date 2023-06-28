import express from 'express';
import { 
    postParticipant,
    getAllParticipants,
    getParticipantsByEventId,
    updateParticipant,
    getDrawnNames,
} from '../controllers/participants.js';

const router = express.Router();

router.post("/post", postParticipant);
router.get("/all", getAllParticipants);
router.get("/:eventId", getParticipantsByEventId);
router.put("/:participantsId", updateParticipant);
router.get("/drawn/:eventId", getDrawnNames);

export default router;