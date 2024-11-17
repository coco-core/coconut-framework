import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './gen-decorator-exp.ts';
import { FieldContext } from './decorator-context.ts';
import type ApplicationContext from '../ioc-container/application-context.ts';

export type Args = Class<any>;

@target([Target.Type.Field])
export class Autowired extends Metadata {
  value: Class<any>;
}

function postConstruct(
  metadata: Autowired,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = appCtx.getBean(metadata.value);
}

export default genDecorator<Args, FieldContext>(Autowired, { postConstruct });
