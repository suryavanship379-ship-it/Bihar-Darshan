import { prisma as db } from '../../db';
import { CreateDiscoverInput, UpdateDiscoverInput } from './discover.validation';
import { AppError } from '../../errors/AppError';
import { DiscoverCategory } from '../../db';

export const getAllDiscoverItems = async (category?: DiscoverCategory, status?: string) => {
  const whereClause: any = {};
  if (category) {
    whereClause.category = category;
  }
  if (status) {
    const upperStatus = status.toUpperCase();
    if (upperStatus !== 'ALL') {
      whereClause.status = upperStatus;
    }
  } else {
    whereClause.status = 'APPROVED';
  }

  return db.discoverItem.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });
};

export const getDiscoverItemById = async (id: string) => {
  const item = await db.discoverItem.findUnique({
    where: { id },
  });

  if (!item) {
    throw new AppError('Discover item not found', 404);
  }

  return item;
};

export const createDiscoverItem = async (data: CreateDiscoverInput) => {
  return db.discoverItem.create({ data });
};

export const updateDiscoverItem = async (id: string, data: UpdateDiscoverInput) => {
  await getDiscoverItemById(id);
  return db.discoverItem.update({
    where: { id },
    data,
  });
};

export const approveDiscoverItem = async (id: string) => {
  await getDiscoverItemById(id);
  return db.discoverItem.update({
    where: { id },
    data: { status: 'APPROVED' },
  });
};

export const rejectDiscoverItem = async (id: string) => {
  await getDiscoverItemById(id);
  return db.discoverItem.update({
    where: { id },
    data: { status: 'REJECTED' },
  });
};

export const deleteDiscoverItem = async (id: string) => {
  await getDiscoverItemById(id);
  return db.discoverItem.delete({
    where: { id },
  });
};
