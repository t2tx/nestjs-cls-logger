import { Injectable, NestMiddleware } from '@nestjs/common';
import { ClsServiceManager } from './cls-service-manager';
import { v4 } from 'uuid';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use = async (req: any, res: any, next: (err?: any) => any) => {
    const cls = ClsServiceManager.getClsService();
    const callback = async () => {
      try {
        const id =
          (req.headers as { 'x-correlation-id'?: string })[
            'x-correlation-id'
          ] ?? v4();
        cls.setTransIdIfUndefined(id);
        next();
      } catch (e) {
        next(e);
      }
    };

    const runner = cls.run.bind(cls);
    runner(callback);
  };
}
