import { Router } from 'express';
import { login, signUp } from '../controllers/authentication.controllers.js';
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
