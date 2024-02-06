import * as winston from 'winston';
import { LogLevel } from '../../../domain/log';

enum LogColors {
  red = '\x1b[31m',
  green = '\x1b[32m',
  yellow = '\x1b[33m',
  blue = '\x1b[34m',
  magenta = '\x1b[35m',
  cyan = '\x1b[36m',
  pink = '\x1b[38;5;206m',
}

export default class ConsoleTransport {
  public static createColorize(use?: boolean) {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf((log) => {
          const color = use
            ? this.mapLogLevelColor(log.level as LogLevel)
            : undefined;
          const cyan = use ? LogColors.cyan : undefined;
          const prefix = `${log.data.label ? `[${log.data.label}]` : ''}`;
          return `${this.colorize(color, prefix + '  -')} ${log.timestamp}    ${
            log.data.correlationId
              ? `(${this.colorize(cyan, log.data.correlationId)})`
              : ''
          } ${this.colorize(color, log.level.toUpperCase())} ${
            log.data.sourceClass
              ? `${this.colorize(cyan, `[${log.data.sourceClass}]`)}`
              : ''
          } ${this.colorize(
            color,
            log.message + ' - ' + (log.data.error ? log.data.error : ''),
          )}${
            log.data.durationMs !== undefined
              ? this.colorize(color, ' +' + log.data.durationMs + 'ms')
              : ''
          }${
            log.data.stack ? this.colorize(color, `  - ${log.data.stack}`) : ''
          }${
            log.data.props ? `  - Props: ${JSON.stringify(log.data.props)}` : ''
          }`;
        }),
      ),
    });
  }

  private static colorize(
    color: LogColors | undefined,
    message: string,
  ): string {
    return !!color ? `${color}${message}\x1b[0m` : message;
  }

  private static mapLogLevelColor(level: LogLevel): LogColors {
    switch (level) {
      case LogLevel.Debug:
        return LogColors.blue;
      case LogLevel.Info:
        return LogColors.green;
      case LogLevel.Warn:
        return LogColors.yellow;
      case LogLevel.Error:
        return LogColors.red;
      case LogLevel.Fatal:
        return LogColors.magenta;
      case LogLevel.Emergency:
        return LogColors.pink;
      default:
        return LogColors.cyan;
    }
  }
}
