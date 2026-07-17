import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import * as notificationService from './notification.service';

export const getMyNotifications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notifications = await notificationService.getMyNotifications(req.user!.id as string);
  sendSuccess(res, 200, 'Notifications fetched successfully', { notifications });
});

export const markAsRead = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notification = await notificationService.markAsRead(req.user!.id as string, req.params.id as string);
  sendSuccess(res, 200, 'Notification marked as read', { notification });
});

export const markAllAsRead = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await notificationService.markAllAsRead(req.user!.id as string);
  sendSuccess(res, 200, 'All notifications marked as read');
});
