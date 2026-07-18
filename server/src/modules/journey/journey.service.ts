import { prisma as db } from '../../db';
import { CreateJourneyInput } from './journey.validation';
import { AppError } from '../../errors/AppError';
import { ApprovalStatus } from '../../db';

export const getApprovedJourneys = async () => {
  return db.journey.findMany({
    where: { status: 'APPROVED' },
    include: {
      author: { select: { id: true, name: true, avatar: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getJourneyById = async (id: string) => {
  const journey = await db.journey.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, avatar: true } } }
  });

  if (!journey) throw new AppError('Journey not found', 404);
  return journey;
};

export const createJourney = async (userId: string, data: CreateJourneyInput) => {
  return db.journey.create({
    data: {
      ...data,
      authorId: userId,
      status: 'PENDING',
    }
  });
};

export const updateJourneyStatus = async (id: string, status: ApprovalStatus) => {
  const journey = await db.journey.findUnique({ where: { id } });
  if (!journey) throw new AppError('Journey not found', 404);

  return db.journey.update({
    where: { id },
    data: { status }
  });
};

export const getAllJourneys = async () => {
  return db.journey.findMany({
    include: {
      author: { select: { id: true, name: true, avatar: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const updateJourney = async (id: string, authorId: string, data: any) => {
  const journey = await db.journey.findUnique({ where: { id } });
  if (!journey) throw new AppError('Journey not found', 404);

  // Skip author verification check if request is by an admin
  const user = await db.user.findUnique({ where: { id: authorId } });
  if (journey.authorId !== authorId && user?.role !== 'ADMIN') {
    throw new AppError('Access denied: You are not the author of this journey', 403);
  }

  return db.journey.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      budget: data.budget,
      district: data.district,
      stops: data.stops,
      status: 'PENDING'
    }
  });
};
