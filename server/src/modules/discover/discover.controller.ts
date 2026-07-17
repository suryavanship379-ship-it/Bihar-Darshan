import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import * as discoverService from './discover.service';
import { createDiscoverSchema, updateDiscoverSchema, discoverCategoryEnum } from './discover.validation';
import { AppError } from '../../errors/AppError';
import { DiscoverCategory } from '../../db';

export const getAllDiscoverItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = req.query.category as string;
  let parsedCategory: DiscoverCategory | undefined;
  
  if (category) {
    const parsed = discoverCategoryEnum.safeParse(category.toUpperCase());
    if (!parsed.success) {
      return next(new AppError('Invalid category', 400));
    }
    parsedCategory = parsed.data as DiscoverCategory;
  }

  const items = await discoverService.getAllDiscoverItems(parsedCategory);
  sendSuccess(res, 200, 'Discover items fetched successfully', { items });
});

export const getDiscoverItemById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const item = await discoverService.getDiscoverItemById(req.params.id as string);
  sendSuccess(res, 200, 'Item fetched successfully', { item });
});

export const createDiscoverItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = createDiscoverSchema.parse(req.body);
  const item = await discoverService.createDiscoverItem(validatedData);
  sendSuccess(res, 201, 'Item created successfully', { item });
});

export const updateDiscoverItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = updateDiscoverSchema.parse(req.body);
  const item = await discoverService.updateDiscoverItem(req.params.id as string, validatedData);
  sendSuccess(res, 200, 'Item updated successfully', { item });
});

export const deleteDiscoverItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await discoverService.deleteDiscoverItem(req.params.id as string);
  sendSuccess(res, 200, 'Item deleted successfully');
});
