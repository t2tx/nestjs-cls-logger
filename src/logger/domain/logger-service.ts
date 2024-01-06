import { Injectable } from '@nestjs/common';

import { ContextStorageService } from '../../context/domain/interfaces/context-storage-service';
import { LogData, LogLevel } from './log';
import { ConfigService } from '../../config/domain/services/config-service';
import { Logger } from './logger';

@Injectable()
export default class LoggerService {
  private tag: string;

  public constructor(
    private readonly logger: Logger,
    configService: ConfigService,
    private contextStorageService: ContextStorageService,
  ) {
    // Set the tag
    this.tag = configService.get('tag') ?? 'default';
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  public debug(message: string, data?: LogData, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  public info(message: string, data?: LogData, profile?: string) {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  public warn(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  public error(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  public fatal(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }

  public emergency(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      tag: data?.tag || this.tag,
      correlationId:
        data?.correlationId || this.contextStorageService.getContextId(),
    };
  }

  public startProfile(id: string) {
    this.logger.startProfile(id);
  }
}
