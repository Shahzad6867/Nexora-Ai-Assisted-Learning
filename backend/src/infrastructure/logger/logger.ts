// src/infrastructure/logger/winston-logger.service.ts
import { createLogger, format, transports, Logger as WinstonInstance } from 'winston';
import { ILogger } from '../../application/interfaces/ILogger'; 
import "winston-mongodb"
import env from '../../config/env.config';

export class WinstonLogger implements ILogger {
  private logger: WinstonInstance;

  constructor() {
    this.logger = createLogger({
      level: env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp(),
        format.json() 
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple() 
          )
        }),

        new transports.MongoDB({
            level: 'error', 
            db: env.MONGODB_CONNECTION_STRING,
             dbName: 'nexora',
            collection: 'application_logs', 
            capped: true, 
            cappedSize: 10000000
          })
      ]
    });
  }

  

  info(message: string, context?: any): void {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: any): void {
    this.logger.warn(message, { context });
  }

  error(message: string, context?: any): void {
    this.logger.error(message, { context });
  }
}
