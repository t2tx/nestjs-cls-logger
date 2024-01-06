import { Global, Module } from '@nestjs/common';
import { NestjsClsContextStorageService } from '../nestjs-cls/nestjs-cls-context-storage-service';
import { ContextStorageService } from '../../domain/interfaces/context-storage-service';
import { ClsModule } from '../cls/cls-module';

@Global()
@Module({
  imports: [ClsModule],
  providers: [
    {
      provide: ContextStorageService,
      useValue: new NestjsClsContextStorageService(),
    },
  ],
  exports: [
    {
      provide: ContextStorageService,
      useValue: new NestjsClsContextStorageService(),
    },
  ],
})
export class ContextModule {}
