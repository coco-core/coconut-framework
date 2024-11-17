/**
 * 将类方法绑定到类实例上
 */
import { Metadata, target, Target, genDecorator } from 'coco-ioc-container';
import type { ApplicationContext, MethodContext } from 'coco-ioc-container';

@target([Target.Type.Method])
export class Bind extends Metadata {}

function postConstruct(
  metadata: Bind,
  appCtx: ApplicationContext,
  name: string
) {
  this[name] = this[name].bind(this);
}

export default genDecorator<void, MethodContext>(Bind, {
  postConstruct,
  optional: true,
});
