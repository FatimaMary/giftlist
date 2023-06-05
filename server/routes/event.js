import express from 'express';
import { 
    postEvent,
    getAllEvents,
    updateEvent,
    getEventsById
} from '../controllers/event.js';

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.put("/:eventId", updateEvent);
router.get("/:userId", getEventsById);

export default router;