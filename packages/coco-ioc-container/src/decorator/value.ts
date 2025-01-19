import genDecorator from './gen-decorator-exp.ts';
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
  let value = appCtx.beanConfig;
  for (const prop of path.trim().split('.')) {
    if (!value) {
      if (__DEV__) {
        console.warn(`没有取到${path}对应的配置值！`);
      }
      break;
    }
    value = value[prop];
  }
  this[name] = value;
}

export default genDecorator<string, ClassFieldDecoratorContext>(Value, {
  postConstruct,
});
