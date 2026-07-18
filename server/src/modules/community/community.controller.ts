import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import { AppError } from '../../errors/AppError';
import * as communityService from './community.service';
import * as validation from './community.validation';

export const getAllCommunities = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const communities = await communityService.getAllCommunities();
  sendSuccess(res, 200, 'Communities fetched successfully', { communities });
});

export const getCommunityById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const community = await communityService.getCommunityById(req.params.id as string);
  sendSuccess(res, 200, 'Community fetched successfully', { community });
});

export const createCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.createCommunitySchema.parse(req.body);
  const community = await communityService.createCommunity(req.user!.id as string, data);
  sendSuccess(res, 201, 'Community created successfully', { community });
});

export const updateCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.updateCommunitySchema.parse(req.body);
  const community = await communityService.updateCommunity(req.params.id as string, data);
  sendSuccess(res, 200, 'Community updated successfully', { community });
});

export const deleteCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await communityService.deleteCommunity(req.params.id as string);
  sendSuccess(res, 200, 'Community deleted successfully');
});

export const joinCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const member = await communityService.joinCommunity(req.params.id as string, req.user!.id as string);
  sendSuccess(res, 200, 'Joined community successfully', { member });
});

export const leaveCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await communityService.leaveCommunity(req.params.id as string, req.user!.id as string);
  sendSuccess(res, 200, 'Left community successfully');
});

// Posts
export const getPostsByCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const posts = await communityService.getPostsByCommunity(req.params.id as string);
  sendSuccess(res, 200, 'Posts fetched successfully', { posts });
});

export const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.createCommunityPostSchema.parse(req.body);
  const post = await communityService.createPost(req.user!.id as string, data);
  sendSuccess(res, 201, 'Post created successfully', { post });
});

export const likePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { voteType, previousVote } = req.body;
  if (!voteType || !previousVote) {
    return next(new AppError('voteType and previousVote are required', 400));
  }
  const post = await communityService.likePost(req.params.id as string, voteType, previousVote);
  sendSuccess(res, 200, 'Post liked successfully', { post });
});

export const votePoll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { optionId, previousOptionId } = req.body;
  if (!optionId) {
    return next(new AppError('optionId is required', 400));
  }
  const post = await communityService.votePoll(req.params.id as string, optionId, previousOptionId ?? null);
  sendSuccess(res, 200, 'Poll voted successfully', { post });
});

export const viewPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await communityService.incrementPostViews(req.params.id as string);
  sendSuccess(res, 200, 'View recorded');
});

// Comments
export const getPostComments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const comments = await communityService.getPostComments(req.params.id as string);
  sendSuccess(res, 200, 'Comments fetched successfully', { comments });
});

export const createPostComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { content, parentId } = req.body;
  if (!content?.trim()) {
    return next(new AppError('Comment content is required', 400));
  }
  const comment = await communityService.createPostComment(
    req.params.id as string,
    req.user!.id as string,
    content.trim(),
    parentId,
  );
  sendSuccess(res, 201, 'Comment created successfully', { comment });
});

export const getUserJoinedCommunities = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const communityIds = await communityService.getUserJoinedCommunities(req.user!.id as string);
  sendSuccess(res, 200, 'User joined communities fetched successfully', { communityIds });
});

export const getAdminAllCommunities = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const communities = await communityService.getAdminAllCommunities();
  sendSuccess(res, 200, 'All communities fetched for admin', { communities });
});

export const approveCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const community = await communityService.approveCommunity(req.params.id as string);
  sendSuccess(res, 200, 'Community approved successfully', { community });
});

export const rejectCommunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const community = await communityService.rejectCommunity(req.params.id as string);
  sendSuccess(res, 200, 'Community rejected successfully', { community });
});

