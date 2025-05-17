import {
  createDecoratorExp,
  type Decorator,
} from '../ioc-container/create-decorator-exp.ts';
import type ApplicationContext from '../ioc-container/application-context.ts';
import Autowired from '../metadata/autowired.ts';

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

// todo cls?: Class<any>如果去掉的话，在项目中会报错，应该是ts-server是拿到参数了，但是声明中确没有
export default createDecoratorExp(Autowired, {
  postConstruct,
}) as (cls?: Class<any>) => Decorator<ClassFieldDecoratorContext>;
