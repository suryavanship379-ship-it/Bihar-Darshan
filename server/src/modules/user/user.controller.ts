import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import { getUserById, updateUserProfile } from './user.service';
import { updateProfileSchema } from './user.validation';

export const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserById(req.user!.id as string);
  sendSuccess(res, 200, 'Profile fetched successfully', { user });
});

export const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = updateProfileSchema.parse(req.body);
  const updatedUser = await updateUserProfile(req.user!.id as string, validatedData);
  sendSuccess(res, 200, 'Profile updated successfully', { user: updatedUser });
});
