import genDecorator from './gen-decorator-exp.ts';
import type ApplicationContext from '../ioc-container/application-context.ts';
import Autowired, { Args } from '../metadata/autowired.ts';

function postConstruct(
  metadata: Autowired,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = appCtx.getBean(metadata.value);
}

export default genDecorator<Args, ClassFieldDecoratorContext>(Autowired, {
  postConstruct,
});
