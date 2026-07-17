import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import { verifyAndSyncUser } from './auth.service';
import { firebaseAdmin } from '../../config/firebase';
import { AppError } from '../../errors/AppError';

export const verifyToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (!token) {
    return next(new AppError('Token is required', 400));
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    const user = await verifyAndSyncUser(uid, email, name, picture);

    sendSuccess(res, 200, 'User authenticated successfully', { user });
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
});
