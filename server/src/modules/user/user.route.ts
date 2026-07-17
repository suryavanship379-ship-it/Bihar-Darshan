import { Router } from 'express';
import { getMyProfile, updateMyProfile } from './user.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// All routes here require authentication
router.use(authenticate);

router.get('/profile', getMyProfile);
router.patch('/profile', updateMyProfile);

export const userRoutes = router;
