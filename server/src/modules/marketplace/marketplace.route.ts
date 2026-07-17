import { Router } from 'express';
import * as marketplaceController from './marketplace.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', marketplaceController.getAllProducts);
router.get('/:id', marketplaceController.getProductById);

// Admin routes
router.use(authenticate, restrictTo('ADMIN'));
router.post('/', marketplaceController.createProduct);
router.patch('/:id', marketplaceController.updateProduct);
router.delete('/:id', marketplaceController.deleteProduct);

export const marketplaceRoutes = router;
