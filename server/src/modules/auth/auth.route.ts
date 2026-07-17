import { Router } from 'express';
import { verifyToken } from './auth.controller';

const router = Router();

router.post('/verify', verifyToken);

export const authRoutes = router;
