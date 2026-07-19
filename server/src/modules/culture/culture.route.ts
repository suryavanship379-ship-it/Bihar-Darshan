import { Router } from 'express';
import * as cultureController from './culture.controller';
import { authenticate, restrictTo } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/tribes', cultureController.getAllTribes);
router.get('/tribes/:id', cultureController.getTribeById);

router.get('/personalities', cultureController.getAllPersonalities);
router.get('/personalities/:id', cultureController.getPersonalityById);

router.get('/articles', cultureController.getAllArticles);
router.get('/articles/:id', cultureController.getArticleById);

// Authenticated routes (for user submissions)
router.post('/personalities', authenticate, cultureController.createPersonality);

// Admin routes
router.use(authenticate, restrictTo('ADMIN'));

router.post('/tribes', cultureController.createTribe);
router.patch('/tribes/:id', cultureController.updateTribe);
router.delete('/tribes/:id', cultureController.deleteTribe);

router.patch('/personalities/:id/approve', cultureController.approvePersonality);
router.patch('/personalities/:id/reject', cultureController.rejectPersonality);
router.patch('/personalities/:id', cultureController.updatePersonality);
router.delete('/personalities/:id', cultureController.deletePersonality);

router.post('/articles', cultureController.createArticle);
router.patch('/articles/:id', cultureController.updateArticle);
router.delete('/articles/:id', cultureController.deleteArticle);

export const cultureRoutes = router;
