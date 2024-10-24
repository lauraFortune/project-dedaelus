import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";


export const unknownEndpoint = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
}


export const errorHandler = ( err: CustomError | Error, req: Request, res: Response, next: NextFunction ) => {
  let statusCode: number;
  let message: string;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if ('statusCode' in err && typeof err.statusCode === 'number') {
    statusCode = err.statusCode;
    message = err.message || 'An unexpected error occurred';
  } else {
    statusCode = res.statusCode !== 200 ? res.statusCode : 500; // default to 500 for unknown errors
    message = err.message || 'An unexpected error occurred';
  }

  res.status(statusCode);
  res.json({
    status: 'error',
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};


