import express from 'express';
//
import { authController } from "../controllers";
import { protectRoute } from "../middlewares";

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/me', protectRoute, authController.me);

export default router;
