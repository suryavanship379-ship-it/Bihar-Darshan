import { Router } from 'express';
import * as galleryController from './gallery.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', galleryController.getApprovedGalleryItems);
router.get('/:id', galleryController.getGalleryItemById);

// Authenticated routes
router.use(authenticate);
router.post('/', galleryController.uploadGalleryItem);

// Admin routes
router.use(restrictTo('ADMIN'));
router.patch('/:id/approve', galleryController.approveGalleryItem);
router.patch('/:id/reject', galleryController.rejectGalleryItem);

export const galleryRoutes = router;
