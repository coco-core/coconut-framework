import { Metadata, target, Target } from 'coco-ioc-container';
import reactive from '../decorator/reactive.ts';

/**
 * @public
 */
@reactive()
@target([Target.Type.Field])
class ReactiveAutowired extends Metadata {
  value: Function;
}

export default ReactiveAutowired;
