import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get isProduction(): boolean {
    return this.environment === 'production';
  }

  get isDevelopment(): boolean {
    return this.environment === 'development';
  }

  get isTest(): boolean {
    return this.environment === 'test';
  }

  get slackWebhookUrl() {
    return this.configService.get<string>('slackWebhookUrl');
  }

  get useColorize() {
    return this.configService.get<boolean>('useColorize');
  }

  private get environment(): string {
    return this.configService.get<string>('NODE_ENV') ?? 'dev';
  }

  get(key: string): string | undefined {
    return this.configService.get<string>(key);
  }
}
