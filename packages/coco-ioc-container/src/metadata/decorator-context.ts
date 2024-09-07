export const KindClass = "class";
export const KindField = "field";

export interface ClassContext {
  kind: typeof KindClass,
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

export type Context = ClassContext | FieldContext;

export type Decorator = (value: any, context: Context) => any;
