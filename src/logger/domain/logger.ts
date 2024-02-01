/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogData, LogLevel } from './log';

export interface Logger {
  log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ): void;
  debug(message: any, data?: LogData, profile?: string): void;
  info(message: any, data?: LogData, profile?: string): void;
  warn(message: any | Error, data?: LogData, profile?: string): void;
  error(message: any | Error, data?: LogData, profile?: string): void;
  fatal(message: any | Error, data?: LogData, profile?: string): void;
  emergency(message: any | Error, data?: LogData, profile?: string): void;
  startProfile(id: any): void;
}
