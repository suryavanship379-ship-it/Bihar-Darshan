import { prisma as db } from '../../db';
import { CreateCommunityInput, CreateCommunityPostInput } from './community.validation';
import { AppError } from '../../errors/AppError';
import { ApprovalStatus } from '../../db';

// --- Community ---
export const getAllCommunities = async () => {
  return db.community.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { posts: { where: { status: 'APPROVED' } }, members: true }
      }
    },
    orderBy: { isFeatured: 'desc' }
  });
};

export const getCommunityById = async (id: string) => {
  const community = await db.community.findUnique({
    where: { id },
    include: {
      _count: {
        select: { posts: { where: { status: 'APPROVED' } }, members: true }
      },
      posts: {
        where: { status: 'APPROVED' },
        include: { author: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!community) throw new AppError('Community not found', 404);
  return community;
};

export const createCommunity = async (userId: string, data: CreateCommunityInput) => {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
  
  return db.community.create({ 
    data: {
      ...data,
      slug,
      createdBy: userId,
      members: {
        create: {
          userId,
          role: 'OWNER'
        }
      }
    } 
  });
};

export const joinCommunity = async (communityId: string, userId: string) => {
  await getCommunityById(communityId);
  return db.communityMember.create({
    data: { communityId, userId, role: 'MEMBER' }
  });
};

export const leaveCommunity = async (communityId: string, userId: string) => {
  return db.communityMember.delete({
    where: { communityId_userId: { communityId, userId } }
  });
};

export const updateCommunity = async (id: string, data: Partial<CreateCommunityInput>) => {
  await getCommunityById(id);
  return db.community.update({ where: { id }, data });
};

export const deleteCommunity = async (id: string) => {
  await getCommunityById(id);
  return db.community.delete({ where: { id } });
};

// --- Posts ---
export const createPost = async (userId: string, data: CreateCommunityPostInput) => {
  return db.communityPost.create({
    data: {
      title: data.title,
      content: data.content,
      communityId: data.communityId,
      mediaUrl: data.mediaUrl,
      mediaType: data.mediaType as any,
      pollData: data.pollData,
      authorId: userId,
      status: 'PENDING', // Default status, needs approval
    }
  });
};

export const updatePostStatus = async (postId: string, status: ApprovalStatus) => {
  const post = await db.communityPost.findUnique({ where: { id: postId } });
  if (!post) throw new AppError('Post not found', 404);

  return db.communityPost.update({
    where: { id: postId },
    data: { status }
  });
};
