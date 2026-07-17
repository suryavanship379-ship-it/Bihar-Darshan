import { prisma as db } from '../../db';
import { CreateProductInput } from './marketplace.validation';
import { AppError } from '../../errors/AppError';

export const getAllProducts = async (category?: string) => {
  return db.marketplaceProduct.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};

export const getProductById = async (id: string) => {
  const product = await db.marketplaceProduct.findUnique({ where: { id } });
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

export const createProduct = async (data: CreateProductInput) => {
  return db.marketplaceProduct.create({ data });
};

export const updateProduct = async (id: string, data: Partial<CreateProductInput>) => {
  await getProductById(id);
  return db.marketplaceProduct.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  await getProductById(id);
  return db.marketplaceProduct.delete({ where: { id } });
};
