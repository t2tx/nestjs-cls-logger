import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import * as morgan from 'morgan';
import { Logger } from '../../domain/logger';
import WinstonLogger from '../winston/winston-logger';
import LoggerService from '../../domain/logger-service';
import { NestjsLoggerServiceAdapter } from './nestjs-logger-service-adapter';
import { ConfigService } from '../../../config/domain/services/config-service';
import ConsoleTransport from '../winston/transports/console-transport';
import SlackTransport from '../winston/transports/slack-transport';
import { ContextStorageService } from '../../../context/domain/interfaces/context-storage-service';

@Global()
@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: (
        configService: ConfigService,
        contextService: ContextStorageService,
      ) => {
        const transports = [];

        transports.push(ConsoleTransport.createColorize());

        if (configService.isProduction) {
          if (configService.slackWebhookUrl) {
            transports.push(
              SlackTransport.create(configService.slackWebhookUrl),
            );
          }
        }

        const logger = new WinstonLogger(transports);
        return new LoggerService(logger, configService, contextService);
      },
      inject: [ConfigService, ContextStorageService],
    },
    {
      provide: NestjsLoggerServiceAdapter,
      useFactory: (logger: Logger) => new NestjsLoggerServiceAdapter(logger),
      inject: [LoggerService],
    },
  ],
  exports: [LoggerService, NestjsLoggerServiceAdapter],
})
export class LoggerModule implements NestModule {
  public constructor(
    private logger: LoggerService,
    private configService: ConfigService,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(this.configService.isProduction ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
