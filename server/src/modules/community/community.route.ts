import { Router } from 'express';
import * as communityController from './community.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', communityController.getAllCommunities);
router.get('/joined/me', authenticate, communityController.getUserJoinedCommunities);
router.get('/:id', communityController.getCommunityById);
router.get('/:id/posts', communityController.getPostsByCommunity);
router.get('/posts/:id/comments', communityController.getPostComments);
router.patch('/posts/:id/view', communityController.viewPost);

// Authenticated user routes
router.use(authenticate);
router.post('/', communityController.createCommunity);
router.post('/:id/join', communityController.joinCommunity);
router.post('/:id/leave', communityController.leaveCommunity);
router.post('/posts', communityController.createPost);
router.post('/posts/:id/comments', communityController.createPostComment);
router.patch('/posts/:id/like', communityController.likePost);
router.patch('/posts/:id/vote', communityController.votePoll);

// Admin-only routes
router.use(restrictTo('ADMIN'));
router.get('/admin/all', communityController.getAdminAllCommunities);
router.patch('/:id/approve', communityController.approveCommunity);
router.patch('/:id/reject', communityController.rejectCommunity);
router.patch('/:id', communityController.updateCommunity);
router.delete('/:id', communityController.deleteCommunity);

export const communityRoutes = router;

