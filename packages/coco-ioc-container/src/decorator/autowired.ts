import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import type ApplicationContext from '../ioc-container/application-context.ts';
import Autowired, { Args } from '../metadata/autowired.ts';

function postConstruct(
  metadata: Autowired,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = appCtx.getComponentForAutowired(
    metadata.value,
    this.constructor,
    name
  );
}

export default createDecoratorExp<Args, ClassFieldDecoratorContext>(Autowired, {
  optional: true,
  postConstruct,
}) as (cls: Args) => Decorator<ClassFieldDecoratorContext>;
