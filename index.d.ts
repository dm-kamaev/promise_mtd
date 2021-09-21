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

  export function map<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result>): Promise<Array<Result>>;

  export function reduce<Result = any, Input = any>(data: Array<Input>, handler: (previousValue: Input, currentValue: Input, index: number, array: Array<Input>) => Promise<Input>, initialValue: Input): Promise<Input>;

  export function transform<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result> | null | undefined): Promise<Array<Result>>;

  export function filter<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<boolean>): Promise<Array<Input>>;

  export function find<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<boolean>): Promise<Input>;

  export function async_while(check: () => boolean, handler: () => void, params?: { limit: number }): Promise<null>;
  export function asyncWhile(check: () => boolean, handler: () => void, params?: { limit: number }): Promise<null>;

  export function async_while(handler: () => Promise<boolean>, params?: { limit: number }): Promise<null>;
  export function asyncWhile(handler: () => Promise<boolean>, params?: { limit: number }): Promise<null>;

  export function parallel<Input = any>(data: Array<Input>, pool: number, handler: (el: Input, index: number) => Promise<void>): void;
  export function parallel<Input = any>(data: Array<Input>, params: { pool: number }, handler: (el: Input, index: number) => Promise<void>): void;

  export function all<T>(list: T): Promise<UnwrapListOrObject<T>>;
  export function all<T extends Object>(list: T): Promise<UnwrapListOrObject<T>>;

  export function setImmediate(): Promise<null>;
}

