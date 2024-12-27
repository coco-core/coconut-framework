import { Metadata, target, Target } from 'coco-ioc-container';
import reactive from '../decorator/reactive.ts';

@reactive()
@target([Target.Type.Field])
class ReactiveAutowired extends Metadata {
  value: Function;
}

export default ReactiveAutowired;
