import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
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
export const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.createCommunityPostSchema.parse(req.body);
  const post = await communityService.createPost(req.user!.id as string, data);
  sendSuccess(res, 201, 'Post created successfully and is pending approval', { post });
});

export const approvePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const post = await communityService.updatePostStatus(req.params.id as string, 'APPROVED');
  sendSuccess(res, 200, 'Post approved successfully', { post });
});

export const rejectPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const post = await communityService.updatePostStatus(req.params.id as string, 'REJECTED');
  sendSuccess(res, 200, 'Post rejected successfully', { post });
});
