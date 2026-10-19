import { ErrorRequestHandler } from 'express';

export class ValidationError extends Error {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
    return;
  }

  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    res.status(400).json({
      success: false,
      error: 'Invalid JSON request body'
    });
    return;
  }

  console.error('Unhandled API error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};