import { Router } from 'express';
import {
  login,
  logout,
  signUp,
} from '../controllers/authentication.controllers.js';
import { isAuthenticated } from '../controllers/middleware.controllers.js';
import {
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controllers.js';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/profile', isAuthenticated, getUser);
router.patch('/profile/update', isAuthenticated, updateUser);
export default router;
