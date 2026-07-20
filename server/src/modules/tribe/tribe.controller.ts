import { Request, Response, NextFunction } from 'express';
import * as tribeService from './tribe.service';
import { createTribeSchema, updateTribeSchema, createTribalArticleSchema } from './tribe.validation';

// --- Tribes ---
export const getActiveTribes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tribes = await tribeService.getAllTribes(false);
    res.status(200).json({ success: true, data: { tribes } });
  } catch (error) {
    next(error);
  }
};

export const getAdminAllTribes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tribes = await tribeService.getAllTribes(true);
    res.status(200).json({ success: true, data: { tribes } });
  } catch (error) {
    next(error);
  }
};

export const getTribeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tribe = await tribeService.getTribeById(req.params.id as string);
    res.status(200).json({ success: true, data: { tribe } });
  } catch (error) {
    next(error);
  }
};

export const createTribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createTribeSchema.parse({ body: req.body }).body;
    const tribe = await tribeService.createTribe(validatedData);
    res.status(201).json({ success: true, data: { tribe } });
  } catch (error) {
    next(error);
  }
};

export const updateTribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateTribeSchema.parse({ body: req.body }).body;
    const tribe = await tribeService.updateTribe(req.params.id as string, validatedData);
    res.status(200).json({ success: true, data: { tribe } });
  } catch (error) {
    next(error);
  }
};

export const deleteTribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tribeService.deleteTribe(req.params.id as string);
    res.status(200).json({ success: true, message: 'Tribe deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// --- Tribal Articles ---
export const getApprovedArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tribeName = req.query.tribe as string | undefined;
    const articles = await tribeService.getApprovedArticles(tribeName);
    res.status(200).json({ success: true, data: { articles } });
  } catch (error) {
    next(error);
  }
};

export const getAllArticlesAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await tribeService.getAllArticlesAdmin();
    res.status(200).json({ success: true, data: { articles } });
  } catch (error) {
    next(error);
  }
};

export const getPendingArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await tribeService.getPendingArticles();
    res.status(200).json({ success: true, data: { articles } });
  } catch (error) {
    next(error);
  }
};

export const submitArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createTribalArticleSchema.parse({ body: req.body }).body;
    const userRole = req.user?.role || 'USER'; // If req.user exists
    const article = await tribeService.createTribalArticle(validatedData, userRole);
    res.status(201).json({ success: true, data: { article } });
  } catch (error) {
    next(error);
  }
};

export const approveArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await tribeService.approveArticle(req.params.id as string);
    res.status(200).json({ success: true, data: { article } });
  } catch (error) {
    next(error);
  }
};

export const rejectArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await tribeService.rejectArticle(req.params.id as string);
    res.status(200).json({ success: true, data: { article } });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tribeService.deleteArticle(req.params.id as string);
    res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};
