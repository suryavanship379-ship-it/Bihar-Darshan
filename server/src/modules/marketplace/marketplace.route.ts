import { Router } from 'express';
import * as marketplaceController from './marketplace.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', marketplaceController.getAllProducts);
router.get('/:id', marketplaceController.getProductById);

// Authenticated user routes (for submission)
router.post('/', authenticate, marketplaceController.createProduct);

// Admin routes
router.patch('/:id/approve', authenticate, restrictTo('ADMIN'), marketplaceController.approveProduct);
router.patch('/:id/reject', authenticate, restrictTo('ADMIN'), marketplaceController.rejectProduct);
router.patch('/:id', authenticate, restrictTo('ADMIN'), marketplaceController.updateProduct);
router.delete('/:id', authenticate, restrictTo('ADMIN'), marketplaceController.deleteProduct);

export const marketplaceRoutes = router;
