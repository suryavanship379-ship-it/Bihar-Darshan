import { Router } from 'express';
import * as tribeController from './tribe.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// --- Public Routes ---
router.get('/', tribeController.getActiveTribes);
router.get('/articles', tribeController.getApprovedArticles);
router.get('/:id', tribeController.getTribeById);

// --- User Routes (Requires Auth for submission, but maybe public can submit? Let's assume auth for now or optional auth) ---
// If the app allows anonymous submissions, we should use an optional auth middleware. 
// For now, let's use a loose submission route, since the UI might not enforce login for sharing story.
router.post('/articles', tribeController.submitArticle);

// --- Admin Routes ---
router.use(authenticate, restrictTo('ADMIN'));

router.get('/admin/all', tribeController.getAdminAllTribes);
router.post('/', tribeController.createTribe);
router.put('/:id', tribeController.updateTribe);
router.delete('/:id', tribeController.deleteTribe);

// Admin Article Routes
router.get('/admin/articles/all', tribeController.getAllArticlesAdmin);
router.get('/admin/articles/pending', tribeController.getPendingArticles);
router.put('/articles/:id/approve', tribeController.approveArticle);
router.put('/articles/:id/reject', tribeController.rejectArticle);
router.delete('/articles/:id', tribeController.deleteArticle);

export { router as tribeRoutes };
