import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import * as districtService from './district.service';
import { createDistrictSchema, updateDistrictSchema } from './district.validation';

export const getAllDistricts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const districts = await districtService.getAllDistricts();
  sendSuccess(res, 200, 'Districts fetched successfully', { districts });
});

export const getDistrictById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const district = await districtService.getDistrictById(req.params.id as string);
  sendSuccess(res, 200, 'District fetched successfully', { district });
});

export const createDistrict = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = createDistrictSchema.parse(req.body);
  const district = await districtService.createDistrict(validatedData);
  sendSuccess(res, 201, 'District created successfully', { district });
});

export const updateDistrict = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = updateDistrictSchema.parse(req.body);
  const district = await districtService.updateDistrict(req.params.id as string, validatedData);
  sendSuccess(res, 200, 'District updated successfully', { district });
});

export const deleteDistrict = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await districtService.deleteDistrict(req.params.id as string);
  sendSuccess(res, 200, 'District deleted successfully');
});
