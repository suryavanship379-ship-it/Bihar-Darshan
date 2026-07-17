import { Router } from 'express';
import * as journeyController from './journey.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', journeyController.getApprovedJourneys);
router.get('/:id', journeyController.getJourneyById);

// Authenticated routes
router.use(authenticate);
router.post('/', journeyController.createJourney);

// Admin routes
router.use(restrictTo('ADMIN'));
router.patch('/:id/approve', journeyController.approveJourney);
router.patch('/:id/reject', journeyController.rejectJourney);

export const journeyRoutes = router;
