import express from 'express';
import { 
    postUser,
    updateUser,
    getUser,
    getUserByEmail,
    getUserNameByUserId,
} from '../controllers/user.js';

const router = express.Router();

router.post("/add", postUser);
router.get("/all", getUser);
router.put("/:userId", updateUser);
router.get("/:email", getUserByEmail);
router.get("/get/:userId", getUserNameByUserId);

export default router;