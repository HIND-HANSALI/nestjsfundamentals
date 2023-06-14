import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserRedirectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(UserRedirectMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.query;

    if (userId === '0') {
      this.logger.log('Redirecting to landing page');
      return res.redirect('/landing');
    } else if (userId === '1') {
      this.logger.log('Redirecting to dashboard');
      return res.redirect('/dashboard');
    }

    this.logger.log('Request...');
    next();
  }
}
