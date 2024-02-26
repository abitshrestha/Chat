import express from 'express';
import { loginController, signupController } from '../controllers/authController.js';
export const authRouter = express.Router();
authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
