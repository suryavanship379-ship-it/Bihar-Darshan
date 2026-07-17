import { Router } from 'express';
import * as discoverController from './discover.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', discoverController.getAllDiscoverItems);
router.get('/:id', discoverController.getDiscoverItemById);

// Admin routes
router.use(authenticate, restrictTo('ADMIN'));
router.post('/', discoverController.createDiscoverItem);
router.patch('/:id', discoverController.updateDiscoverItem);
router.delete('/:id', discoverController.deleteDiscoverItem);

export const discoverRoutes = router;
