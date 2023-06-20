import express from 'express';
import { 
    postUser,
    updateUser,
    getUser,
    getUserByEmail,
} from '../controllers/user.js';

const router = express.Router();

router.post("/add", postUser);
router.get("/all", getUser);
router.put("/:userId", updateUser);
router.get("/:email", getUserByEmail);

export default router;