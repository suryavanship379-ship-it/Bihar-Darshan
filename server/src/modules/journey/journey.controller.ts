import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../helpers/responseHandler';
import * as journeyService from './journey.service';
import * as validation from './journey.validation';

export const getApprovedJourneys = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const journeys = await journeyService.getApprovedJourneys();
  sendSuccess(res, 200, 'Journeys fetched successfully', { journeys });
});

export const getJourneyById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const journey = await journeyService.getJourneyById(req.params.id as string);
  sendSuccess(res, 200, 'Journey fetched successfully', { journey });
});

export const createJourney = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = validation.createJourneySchema.parse(req.body);
  const journey = await journeyService.createJourney(req.user!.id as string, data);
  sendSuccess(res, 201, 'Journey submitted successfully and is pending approval', { journey });
});

export const approveJourney = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const journey = await journeyService.updateJourneyStatus(req.params.id as string, 'APPROVED');
  sendSuccess(res, 200, 'Journey approved successfully', { journey });
});

export const rejectJourney = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const journey = await journeyService.updateJourneyStatus(req.params.id as string, 'REJECTED');
  sendSuccess(res, 200, 'Journey rejected successfully', { journey });
});
