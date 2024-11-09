export const KindClass = 'class';
export const KindField = 'field';
export const KindMethod = 'method';

export interface ClassContext {
  kind: typeof KindClass;
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}

export interface FieldContext {
  kind: typeof KindField;
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

export interface MethodContext {
  kind: typeof KindMethod;
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

export type Kind = typeof KindClass | typeof KindField | typeof KindMethod;
export type Context = ClassContext | FieldContext | MethodContext;

export type Decorator = (value: any, context: Context) => any;
