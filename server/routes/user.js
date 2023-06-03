import express from 'express';
import { 
    postUser,
    updateUser,
    getUser,
} from '../controllers/user.js';

const router = express.Router();

router.post("/add", postUser);
router.get("/all", getUser);
router.put("/:userId", updateUser);

export default router;