import { Injectable } from '@nestjs/common';
import { ContextStorageIF } from '../../domain/interfaces/context-storage-service';
import { ClsService } from '../cls/cls-service';
import { TRANS_ID } from '../cls/cls-constants';
import { ClsServiceManager } from '../cls/cls-service-manager';

@Injectable()
export class NestjsClsContextStorageService implements ContextStorageIF {
  private readonly cls: ClsService;
  constructor() {
    this.cls = ClsServiceManager.getClsService();
  }

  public setContextId(id: string) {
    this.cls.set(TRANS_ID, id);
  }

  public getContextId(): string {
    return this.cls.getId();
  }
}
