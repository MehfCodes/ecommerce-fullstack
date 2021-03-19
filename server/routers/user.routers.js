import { Router } from 'express';
import {
  login,
  logout,
  signUp,
} from '../controllers/authentication.controllers.js';
import { isAuthenticated } from '../controllers/middleware.controllers.js';
import { getUser, updateUser } from '../controllers/user.controllers.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/me', isAuthenticated, getUser);
router.patch('/me/update', isAuthenticated, updateUser);
export default router;
