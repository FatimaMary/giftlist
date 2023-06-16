import express from 'express';
import { 
    postParticipant,
    getAllParticipants,
} from '../controllers/participants.js';

const router = express.Router();

router.post("/post", postParticipant);
router.get("/all", getAllParticipants);

export default router;