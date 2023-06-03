import express from 'express';
import { 
    postEvent,
    getAllEvents,
    updateEvent,
} from '../controllers/event.js';

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.put("/:eventId", updateEvent);

export default router;