import { Router } from 'express';
import {
  login,
  logout,
  signUp,
} from '../controllers/authentication.controllers.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', logout);

export default router;
