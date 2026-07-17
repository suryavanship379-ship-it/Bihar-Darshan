import { prisma as db } from '../../db';
import { CreateDiscoverInput, UpdateDiscoverInput } from './discover.validation';
import { AppError } from '../../errors/AppError';
import { DiscoverCategory } from '../../db';

export const getAllDiscoverItems = async (category?: DiscoverCategory) => {
  return db.discoverItem.findMany({
    where: category ? { category } : undefined,
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

export const deleteDiscoverItem = async (id: string) => {
  await getDiscoverItemById(id);
  return db.discoverItem.delete({
    where: { id },
  });
};
