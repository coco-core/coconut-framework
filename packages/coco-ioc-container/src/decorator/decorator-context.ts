export const KindClass = 'class';
export const KindField = 'field';
export const KindMethod = 'method';
export type Field = string;

export type Kind = typeof KindClass | typeof KindField | typeof KindMethod;
export type Context =
  | ClassDecoratorContext
  | ClassFieldDecoratorContext
  | ClassMethodDecoratorContext;

export type Decorator<C> = (value: any, context: C) => any;
