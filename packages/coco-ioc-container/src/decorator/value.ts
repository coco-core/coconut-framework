import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import type ApplicationContext from '../ioc-container/application-context.ts';
import Value from '../metadata/value.ts';

function postConstruct(
  metadata: Value,
  appCtx: ApplicationContext,
  name: string
) {
  const path = metadata.value;
  if (typeof path !== 'string' || !path.trim()) {
    return;
  }
  this[name] = appCtx.propertiesConfig.getValue(path);
}

export default createDecoratorExp(Value, { postConstruct }) as (
  path: string
) => Decorator<ClassFieldDecoratorContext>;
