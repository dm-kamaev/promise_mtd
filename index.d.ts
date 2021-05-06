type Unwrap<T> =
  T extends Promise<infer U> ? U :
  T extends (...args: any) => Promise<infer U> ? U :
  T extends (...args: any) => infer U ? U :
  T

declare module 'promise_mtd' {
  export function forEach<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<void>): void;
  export function foreach<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<void>): void;

  export function map<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result>): Promise<Array<Result>>;

  export function transform<Result = any, Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<Result> | null | undefined): Promise<Array<Result>>;

  export function filter<Input = any>(data: Array<Input>, handler: (el: Input, index: number) => Promise<boolean>): Promise<Array<Input>>;

  export function async_while(check: () => boolean, handler: () => void): Promise<null>;
  export function asyncWhile(check: () => boolean, handler: () => void): Promise<null>;

  export function parallel<Input = any>(data: Array<Input>, limit: number, handler: (el: Input, index: number) => Promise<void>): void;

  export function all<Input = any>(data: Array<Input>): Promise<Array< Unwrap<Input> >>;
  export function all<Input = any>(data: { [k: string]: Input }): Promise<{ [k: string]: Unwrap<Input> }>;

  export function setImmediate(): Promise<null>;
}

