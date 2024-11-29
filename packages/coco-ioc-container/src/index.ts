import { register, NAME } from 'shared';
import { addPostConstruct } from './ioc-container/bean-factory.ts';

export { default as autowired, Autowired } from './decorator/autowired.ts';
export { default as Metadata } from './decorator/metadata.ts';
import { default as bean, Bean } from './decorator/bean.ts';
export { bean, Bean };
import { default as component, Component } from './decorator/component.ts';
export { component, Component };
export {
  default as configuration,
  Configuration,
} from './decorator/configuration.ts';
import { default as scope, Scope } from './decorator/scope.ts';
export { scope, Scope };
export { default as target, Target } from './decorator/target.ts';
export { default as genDecorator } from './decorator/gen-decorator-exp.ts';
export { getBean } from './ioc-container/bean-factory.ts';
export {
  addClassMetadata,
  addFieldMethodMetadata,
  getFields,
} from './ioc-container/metadata.ts';
export { getDefinition } from './ioc-container/bean-factory.ts';
export { default as ApplicationContext } from './ioc-container/application-context.ts';

export type {
  ClassContext,
  FieldContext,
  MethodContext,
} from './decorator/decorator-context.ts';

import * as testHelper from './_test_helper/index.ts';
let _test_helper = testHelper;
if (!__TEST__) {
  _test_helper = {} as any;
}
export { _test_helper };

register(NAME.Bean, Bean);
register(NAME.Scope, Scope);
register(NAME.Component, Component);
register(NAME.addPostConstruct, addPostConstruct);
