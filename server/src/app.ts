import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { globalErrorHandler } from './middlewares/error.middleware';
import { AppError } from './errors/AppError';
import { logger } from './utils/logger';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/user/user.route';
import { districtRoutes } from './modules/district/district.route';
import { discoverRoutes } from './modules/discover/discover.route';
import { cultureRoutes } from './modules/culture/culture.route';
import { communityRoutes } from './modules/community/community.route';
import { journeyRoutes } from './modules/journey/journey.route';
import { galleryRoutes } from './modules/gallery/gallery.route';
import { marketplaceRoutes } from './modules/marketplace/marketplace.route';
import { adminRoutes } from './modules/admin/admin.route';
import { notificationRoutes } from './modules/notification/notification.route';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(','),
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Request Parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }));
}

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/districts', districtRoutes);
app.use('/api/v1/discover', discoverRoutes);
app.use('/api/v1/culture', cultureRoutes);
app.use('/api/v1/community', communityRoutes);
app.use('/api/v1/journeys', journeyRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/notifications', notificationRoutes);

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Unknown route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
