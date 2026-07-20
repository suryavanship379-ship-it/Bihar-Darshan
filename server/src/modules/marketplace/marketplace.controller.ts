import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import * as marketplaceService from './marketplace.service';
import * as validation from './marketplace.validation';

export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = req.query.category as string;
  const status = req.query.status as string;
  const products = await marketplaceService.getAllProducts(category, status);
  sendSuccess(res, 200, 'Products fetched successfully', { products });
});

export const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await marketplaceService.getProductById(req.params.id as string);
  sendSuccess(res, 200, 'Product fetched successfully', { product });
});

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.createProductSchema.parse(req.body);
  const product = await marketplaceService.createProduct(data);
  sendSuccess(res, 201, 'Product created successfully', { product });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.updateProductSchema.parse(req.body);
  const product = await marketplaceService.updateProduct(req.params.id as string, data);
  sendSuccess(res, 200, 'Product updated successfully', { product });
});

export const approveProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await marketplaceService.approveProduct(req.params.id as string);
  sendSuccess(res, 200, 'Product approved successfully', { product });
});

export const rejectProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const product = await marketplaceService.rejectProduct(req.params.id as string);
  sendSuccess(res, 200, 'Product rejected successfully', { product });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await marketplaceService.deleteProduct(req.params.id as string);
  sendSuccess(res, 200, 'Product deleted successfully');
});
