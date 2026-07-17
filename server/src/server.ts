import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { prisma as db } from './db';

const PORT = env.PORT || 5000;

let server: any;

async function bootstrap() {
  try {
    // Check DB Connection
    await db.$connect();
    logger.info('✅ Successfully connected to the database.');

    server = app.listen(PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
}

bootstrap();

process.on('unhandledRejection', (err: any) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  if (server) {
    server.close(() => {
      logger.info('💥 Process terminated!');
      db.$disconnect();
    });
  }
});
