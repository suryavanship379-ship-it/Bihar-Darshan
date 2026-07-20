import { prisma as db } from '../../db';
import { AppError } from '../../errors/AppError';
import { CreateTribeInput, UpdateTribeInput, CreateTribalArticleInput } from './tribe.validation';

// --- Tribes ---
export const getAllTribes = async (includeInactive = false) => {
  return db.tribe.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: [{ isFeatured: 'desc' }, { englishName: 'asc' }],
  });
};

export const getTribeById = async (id: string) => {
  const tribe = await db.tribe.findUnique({ where: { id } });
  if (!tribe) throw new AppError('Tribe not found', 404);
  return tribe;
};

export const createTribe = async (data: CreateTribeInput) => {
  return db.tribe.create({ data: data as any });
};

export const updateTribe = async (id: string, data: UpdateTribeInput) => {
  const existing = await db.tribe.findUnique({ where: { id } });
  
  if (!existing) {
    // If it doesn't exist, create it (e.g. saving a mock tribe for the first time)
    return db.tribe.create({
      data: {
        id,
        hindiName: data.hindiName || '',
        englishName: data.englishName || '',
        shortDesc: data.shortDesc || '',
        image: data.image || '',
        leftTitle: data.leftTitle,
        leftDesc: data.leftDesc,
        rightTitle: data.rightTitle,
        rightDesc: data.rightDesc,
        bottomDesc: data.bottomDesc,
        cultureSections: data.cultureSections ? (data.cultureSections as any) : undefined,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
      }
    });
  }

  return db.tribe.update({
    where: { id },
    data: data as any,
  });
};

export const deleteTribe = async (id: string) => {
  await getTribeById(id);
  return db.tribe.delete({ where: { id } });
};

// --- Tribal Articles ---
export const getApprovedArticles = async (tribeName?: string) => {
  const whereClause: any = { status: 'APPROVED' };
  if (tribeName) {
    whereClause.tribe = { equals: tribeName, mode: 'insensitive' };
  }
  return db.tribalArticle.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });
};

export const getAllArticlesAdmin = async () => {
  return db.tribalArticle.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getPendingArticles = async () => {
  return db.tribalArticle.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTribalArticle = async (data: CreateTribalArticleInput, userRole: string = 'USER') => {
  // If the user is an ADMIN, auto-approve the article
  const status = userRole === 'ADMIN' ? 'APPROVED' : 'PENDING';
  
  // Provide defaults for image if missing
  const image = data.image || (data.images && data.images.length > 0 ? data.images[0] : '');
  
  const createData = {
    ...data,
    image,
    status: status as any,
  };
  
  return db.tribalArticle.create({ data: createData as any });
};

export const approveArticle = async (id: string) => {
  const article = await db.tribalArticle.findUnique({ where: { id } });
  if (!article) throw new AppError('Article not found', 404);
  
  return db.tribalArticle.update({
    where: { id },
    data: { status: 'APPROVED' },
  });
};

export const rejectArticle = async (id: string) => {
  const article = await db.tribalArticle.findUnique({ where: { id } });
  if (!article) throw new AppError('Article not found', 404);
  
  return db.tribalArticle.update({
    where: { id },
    data: { status: 'REJECTED' },
  });
};

export const deleteArticle = async (id: string) => {
  const article = await db.tribalArticle.findUnique({ where: { id } });
  if (!article) throw new AppError('Article not found', 404);
  
  return db.tribalArticle.delete({ where: { id } });
};
