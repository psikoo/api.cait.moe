import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BasicPasswordMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger("BasicPasswordMiddleware");
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.method !== "GET" && req.headers.apikey !== this.configService.get("API_KEY") && req.headers.apikey !== this.configService.get("API_KEY_GUEST")) {
      this.logger.error(`[Error] Invalid apikey: "${req.headers.apikey}"`);
      return res.status(401).json({ Error: "Invalid apikey" });
    }
    next();
  }
}