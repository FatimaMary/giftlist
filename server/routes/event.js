import express from 'express';
import { 
    postEvent,
    getAllEvents,
    updateEvent,
    getEventsById,
    getEventDetailsbyEventId,
} from '../controllers/event.js';

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.put("/:eventId", updateEvent);
router.get("/:userId", getEventsById);
router.get("/get/:eventId", getEventDetailsbyEventId);

export default router;