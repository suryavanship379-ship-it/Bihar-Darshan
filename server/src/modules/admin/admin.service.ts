import { prisma as db } from '../../db';

export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalDistricts,
    totalCommunities,
    pendingCommunities,
    pendingPosts,
    pendingJourneys,
    pendingGalleryItems,
    pendingDiscoverItems,
    pendingPersonalities
  ] = await Promise.all([
    db.user.count(),
    db.district.count(),
    db.community.count(),
    db.community.count({ where: { status: 'PENDING' } }),
    db.communityPost.count({ where: { status: 'PENDING' } }),
    db.journey.count({ where: { status: 'PENDING' } }),
    db.galleryItem.count({ where: { status: 'PENDING' } }),
    db.discoverItem.count({ where: { status: 'PENDING' } }),
    db.personality.count({ where: { status: 'PENDING' } }),
  ]);

  return {
    overview: {
      totalUsers,
      totalDistricts,
      totalCommunities,
    },
    pendingApprovals: {
      communities: pendingCommunities,
      posts: pendingPosts,
      journeys: pendingJourneys,
      galleryItems: pendingGalleryItems,
      discoverItems: pendingDiscoverItems,
      personalities: pendingPersonalities,
    }
  };
};

export const getPendingApprovals = async () => {
  const [communities, posts, journeys, galleryItems, discoverItems, personalities] = await Promise.all([
    db.community.findMany({ where: { status: 'PENDING' }, include: { creator: { select: { name: true, email: true } } } }),
    db.communityPost.findMany({ where: { status: 'PENDING' }, include: { author: { select: { name: true, email: true } } } }),
    db.journey.findMany({ where: { status: 'PENDING' }, include: { author: { select: { name: true, email: true } } } }),
    db.galleryItem.findMany({ where: { status: 'PENDING' }, include: { uploader: { select: { name: true, email: true } } } }),
    db.discoverItem.findMany({ where: { status: 'PENDING' } }),
    db.personality.findMany({ where: { status: 'PENDING' } }),
  ]);

  return {
    communities,
    posts,
    journeys,
    galleryItems,
    discoverItems,
    personalities,
  };
};
