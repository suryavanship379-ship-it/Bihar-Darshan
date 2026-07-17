import { prisma as db } from '../../db';

export const verifyAndSyncUser = async (firebaseUid: string, email?: string, name?: string, avatar?: string) => {
  // Check if user exists
  let user = await db.user.findUnique({
    where: { firebaseUid },
  });

  if (!user) {
    // Create new user
    user = await db.user.create({
      data: {
        firebaseUid,
        email,
        name: name || 'User',
        avatar,
      },
    });
  } else {
    // Optionally update email/name/avatar if they changed, 
    // but usually we rely on profile updates. 
    // We'll just update last login or something if we had a field for it.
  }

  return user;
};
