import { Request, Response, NextFunction } from "express";

interface ICustomError extends Error {
  statusCode?: number,
}

export const unkownEndpoint = (req: Request, res: Response, next: NextFunction) => {
  const error: ICustomError = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}


export const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {

  const statusCode = err.statusCode ? err.statusCode: res.statusCode !== 200 ? res.statusCode: 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode);
  res.json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};


