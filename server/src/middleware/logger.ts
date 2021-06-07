import { Request, Response, NextFunction } from 'express';

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  //console.log(`${request.method} ${request.path}`);
  next();
}

export { loggerMiddleware };
