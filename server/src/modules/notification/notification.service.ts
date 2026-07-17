import { prisma as db } from '../../db';
import { AppError } from '../../errors/AppError';
import { NotificationType } from '../../db';

export const getMyNotifications = async (userId: string) => {
  return db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const markAsRead = async (userId: string, notificationId: string) => {
  const notification = await db.notification.findUnique({ where: { id: notificationId } });
  
  if (!notification || notification.userId !== userId) {
    throw new AppError('Notification not found', 404);
  }

  return db.notification.update({
    where: { id: notificationId },
    data: { unread: false }
  });
};

export const markAllAsRead = async (userId: string) => {
  return db.notification.updateMany({
    where: { userId, unread: true },
    data: { unread: false }
  });
};

// Internal utility to create a notification (called by other services like approvals)
export const createNotification = async (userId: string, title: string, message: string, type: NotificationType) => {
  return db.notification.create({
    data: {
      userId,
      title,
      message,
      type
    }
  });
};
