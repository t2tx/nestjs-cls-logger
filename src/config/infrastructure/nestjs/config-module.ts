import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '../../domain/services/config-service';

/**
 * @description
 * - tag: tag for log
 * - slackWebhookUrl: slack webhook url (send fatal, emergency log to slack in production mode)
 */
export interface LogConfig {
  tag?: string;
  slackWebhookUrl?: string;
  overrideConsole?: boolean;
  useColorize?: boolean;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(config?: LogConfig): DynamicModule {
    return {
      module: ConfigModule,
      imports: [NestConfigModule.forFeature(() => config ?? {})],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
