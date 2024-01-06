import { AsyncLocalStorage } from 'async_hooks';
import { TRANS_ID } from './cls-constants';

type KeyType = symbol;

export class ClsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly als: AsyncLocalStorage<any>) {}

  /**
   * Set (or overrides) a value on the CLS context.
   * @param key the key
   * @param value the value to set
   */
  set(key: KeyType, value: string): void {
    const store = this.als.getStore();
    if (!store) {
      throw new Error(
        `Cannot set the key "${String(
          key,
        )}". No CLS context available, please make sure that a ClsMiddleware/Guard/Interceptor has set up the context, or wrap any calls that depend on CLS with "ClsService#run"`,
      );
    }
    store[key] = value;
  }

  /**
   * Set a value on the CLS context if it doesn't already exist
   * @param value the value to set
   * @returns `true` if value vas set, `false` if it existed before
   */
  setTransIdIfUndefined(value: string): boolean {
    if (this.has(TRANS_ID)) return false;
    this.set(TRANS_ID, value);
    return true;
  }

  get(key?: KeyType) {
    const store = this.als.getStore();
    if (!key) return store;
    return store[key];
  }

  /**
   * Check if a key is in the CLS context
   * @param key the key to check
   * @returns true if the key is in the CLS context
   */
  has(key: KeyType): boolean {
    const store = this.als.getStore();
    return store[key] !== undefined;
  }

  /**
   * Retrieve the request ID (a shorthand for `cls.get(CLS_ID)`)
   * @returns the request ID or undefined
   */
  getId(): string {
    const store = this.als.getStore();
    return store?.[TRANS_ID];
  }

  /**
   * Run the callback with a shared CLS context.
   * @returns whatever the callback returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run(callback: any) {
    return this.runWith({}, callback);
  }

  /**
   * Run the callbacks with a new CLS context.
   *
   * @param store the default context contents
   * @param callback function to run
   * @returns whatever the callback returns
   */
  runWith<T = unknown>(store: unknown, callback: () => T) {
    return this.als.run(store ?? {}, callback);
  }

  /**
   * Run any following code with a shared ClS context
   * @param store the default context contents
   */
  enterWith(store?: unknown) {
    return this.als.enterWith(store ?? {});
  }

  /**
   * Run the callback outside of a shared CLS context
   * @param callback function to run
   * @returns whatever the callback returns
   */
  exit(callback: () => unknown) {
    return this.als.exit(callback);
  }

  /**
   * Whether the current code runs within an active CLS context.
   * @returns true if a CLS context is active
   */
  isActive() {
    return !!this.als.getStore();
  }
}
