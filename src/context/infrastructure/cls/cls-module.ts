import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsMiddleware } from './cls-middleware';

@Module({})
export class ClsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
