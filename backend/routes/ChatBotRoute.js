import express from 'express';
import { getResponse } from '../controller/chatBotController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();


router.post('/getResponse',verifyToken,getResponse);
export default router;