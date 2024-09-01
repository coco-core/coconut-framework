export enum ContextKind {
  class = 'class',
  method = 'method',
  field = 'field',
}

export interface ClassContext {
  kind: ContextKind.class;
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}

export interface MethodContext {
  kind: ContextKind.method;
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

export interface FieldContext {
  kind: ContextKind.field;
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}
