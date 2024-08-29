interface ClassContext {
  kind: 'class';
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}

interface FieldContext {
  kind: 'field';
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

interface Class<T> {
  new (...args: any): T;
}
