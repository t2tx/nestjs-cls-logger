import { DynamicModule, Module } from '@nestjs/common';
import { ContextModule } from './context/infrastructure/nestjs/context-module';
import {
  ConfigModule,
  LogConfig,
} from './config/infrastructure/nestjs/config-module';
import { LoggerModule } from './logger/infrastructure/nestjs/logger-module';

@Module({})
export class NestJsClsLoggerModule {
  static forRoot(config: LogConfig): DynamicModule {
    return {
      module: NestJsClsLoggerModule,
      imports: [LoggerModule, ConfigModule.forRoot(config), ContextModule],
    };
  }
}
