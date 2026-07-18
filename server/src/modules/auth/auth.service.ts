import { prisma as db } from '../../db';

export const verifyAndSyncUser = async (firebaseUid: string, email?: string, name?: string, avatar?: string) => {
  // Check if user exists
  let user = await db.user.findUnique({
    where: { firebaseUid },
  });

  if (!user) {
    const isSystemAdmin = email?.toLowerCase() === 'bihardarshanofficial@gmail.com';
    const targetRole = isSystemAdmin ? 'ADMIN' : 'USER';
    // Create new user
    user = await db.user.create({
      data: {
        firebaseUid,
        email,
        name: name || 'User',
        avatar,
        role: targetRole,
      },
    });
  } else {
    const isSystemAdmin = email?.toLowerCase() === 'bihardarshanofficial@gmail.com';
    if (isSystemAdmin && user.role !== 'ADMIN') {
      user = await db.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' },
      });
    }
  }

  return user;
};
