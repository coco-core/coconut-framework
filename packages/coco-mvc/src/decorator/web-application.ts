/**
 * web应用装饰器
 */
import {
  ClassContext,
  Metadata,
  genDecorator,
  target,
  Target,
  configuration,
} from 'coco-ioc-container';

@target([Target.Type.Class])
@configuration()
export class WebApplication extends Metadata {}

export default genDecorator<void, ClassContext>(WebApplication, {
  optional: true,
});
