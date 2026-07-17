import { Router } from 'express';
import * as communityController from './community.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', communityController.getAllCommunities);
router.get('/:id', communityController.getCommunityById);

// Authenticated user routes
router.use(authenticate);
router.post('/', communityController.createCommunity);
router.post('/:id/join', communityController.joinCommunity);
router.post('/:id/leave', communityController.leaveCommunity);
router.post('/posts', communityController.createPost);

// Admin routes
router.use(restrictTo('ADMIN'));
router.patch('/:id', communityController.updateCommunity);
router.delete('/:id', communityController.deleteCommunity);

router.patch('/posts/:id/approve', communityController.approvePost);
router.patch('/posts/:id/reject', communityController.rejectPost);

export const communityRoutes = router;
