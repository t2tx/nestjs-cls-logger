/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // override the console.log
    if (configService.get('overrideConsole')) {
      console.info = (message: any, ...params: any[]) =>
        this.info(message, params?.length ? { props: { params } } : undefined);

      console.log = (message: any, ...params: any[]) =>
        this.debug(message, params?.length ? { props: { params } } : undefined);

      console.debug = (message: any, ...params: any[]) =>
        this.debug(message, params?.length ? { props: { params } } : undefined);

      console.warn = (message: any, ...params: any[]) =>
        this.warn(message, params?.length ? { props: { params } } : undefined);

      console.error = (message: any, ...params: any[]) =>
        this.error(message, params?.length ? { props: { params } } : undefined);
    }
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  public debug(message: any, data?: LogData, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  public info(message: any, data?: LogData, profile?: string) {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  public warn(message: any | Error, data?: LogData, profile?: string) {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  public error(message: any | Error, data?: LogData, profile?: string) {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  public fatal(message: any | Error, data?: LogData, profile?: string) {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }

  public emergency(message: any | Error, data?: LogData, profile?: string) {
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
