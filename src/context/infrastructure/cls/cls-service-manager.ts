import { globalClsService } from './cls-service.globals';
import { ClsService } from './cls-service';

export class ClsServiceManager {
  private static clsService = globalClsService;

  /**
   * Retrieve a ClsService outside of Nest's DI.
   * @returns the ClsService
   */
  static getClsService(): ClsService {
    const cls = this.clsService;
    return cls;
  }
}
