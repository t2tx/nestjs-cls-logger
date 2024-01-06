import { Injectable } from '@nestjs/common';

export const ContextStorageServiceKey = Symbol();

export interface ContextStorageIF {
  setContextId(contextId: string): void;
  getContextId(): string;
}

@Injectable()
export class ContextStorageService {
  constructor(private readonly contextStorage: ContextStorageIF) {}
  setContextId(contextId: string): void {
    this.contextStorage.setContextId(contextId);
  }

  getContextId(): string {
    return this.contextStorage.getContextId();
  }
}
