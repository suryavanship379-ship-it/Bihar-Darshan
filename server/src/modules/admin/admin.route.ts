import { Router } from 'express';
import * as adminController from './admin.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, restrictTo('ADMIN'));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/approvals', adminController.getPendingApprovals);

export const adminRoutes = router;
