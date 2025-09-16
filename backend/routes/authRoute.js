import express from 'express';
import { login,logout,registerUser} from '../controller/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/login',login)
router.post('/logout',logout)
router.get("/me", verifyToken, (req, res) => {
    res.json({ success: true, user: req.user }); 
  });
export default router;