type Unwrap<T> =
  T extends Promise<infer U> ? U :
  T extends (...args: any) => Promise<infer U> ? U :
  T extends (...args: any) => infer U ? U :
  T

type UnwrapListOrObject<Type> = {
  [P in keyof Type]: Unwrap<Type[P]>;
};

declare module 'promise_mtd' {
  export function forEach<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<void>): void;
  export function foreach<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<void>): void;
  export function forEachParallel<Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<void>): void;

  export function map<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result>): Promise<Array<Result>>;
  export function mapParallel<Result = any, Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<Result>): Promise<Array<Result>>;

  export function reduce<Result = any, Input = any>(data: Array<Input>, handler: (previousValue: Input, currentValue: Input, index: number, array: Array<Input>) => Promise<Input>, initialValue: Input): Promise<Input>;

  export function transform<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result> | null | undefined): Promise<Array<Result>>;
  export function transformParallel<Result = any, Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<Result> | null | undefined): Promise<Array<Result>>;

  export function filter<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<boolean>): Promise<Array<Input>>;
  export function filterParallel<Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<boolean>): Promise<Array<Input>>;

  export function find<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<boolean>): Promise<Input>;
  export function findParallel<Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<boolean>): Promise<Input>;

  export function while_(check: () => boolean, handler: () => void, params?: { limit: number }): Promise<null>;
  export function while_(handler: () => Promise<boolean>, params?: { limit: number }): Promise<null>;

  export function retry<T extends (...args: any) => any, E extends { new(...arg: any): any }>(fn: T, settings: { attemp: number, delay?: { ms: number }, ifError?: E }): (...argv: Parameters<T>) => Promise<ReturnType<T>>;

  export function all<T>(list: T): Promise<UnwrapListOrObject<T>>;
  export function all<T extends Object>(list: T): Promise<UnwrapListOrObject<T>>;

  export function timeout(ms: number): void;
  export function setImmediate(): Promise<null>;
}

