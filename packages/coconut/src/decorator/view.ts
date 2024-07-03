import {registerFields, MetaKeyView} from "shared/meta.js";

interface Context {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}
type ClassFieldDecorator = (value: undefined, context: Context) => (initialValue: unknown) => unknown | void;

function view (value, { kind, name, addInitializer }: Context) {
  if (kind === 'field') {
    addInitializer(function() {
      registerFields(this.constructor, MetaKeyView, name as string);
      return undefined;
    })
  } else {
    throw new Error('view只能装饰类成员变量')
  }
  return undefined;
}

export { view }
