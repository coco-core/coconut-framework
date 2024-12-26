export { default as autowired, Autowired } from './decorator/autowired.ts';
export { default as Metadata } from './decorator/metadata.ts';
export { default as bean, Bean } from './decorator/bean.ts';
export { default as component, Component } from './decorator/component.ts';
export {
  default as configuration,
  Configuration,
} from './decorator/configuration.ts';
export { default as scope, Scope } from './decorator/scope.ts';
export { default as target, Target } from './decorator/target.ts';
export { default as genDecorator } from './decorator/gen-decorator-exp.ts';
export { default as inject, Inject } from './decorator/inject.ts';
export { default as init, Init } from './decorator/init.ts';
export { default as start, Start } from './decorator/start.ts';
export { default as ApplicationContext } from './ioc-container/application-context.ts';

export type {
  ClassContext,
  FieldContext,
  MethodContext,
} from './decorator/decorator-context.ts';
