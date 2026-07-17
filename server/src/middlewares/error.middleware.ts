import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (env.NODE_ENV === 'development') {
    logger.error(`[${req.method}] ${req.url} >> StatusCode:: ${err.statusCode}, Message:: ${err.message}`);
    if (!err.isOperational) {
      logger.error('Error Stack:', err.stack);
    }
    
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Production
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      // Programming or other unknown error: don't leak error details
      logger.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        message: 'Something went very wrong!',
      });
    }
  }
};
