import { get, NAME } from 'shared';
import {
  Metadata,
  target,
  Target,
  genDecorator,
  type ApplicationContext,
  type FieldContext,
} from 'coco-ioc-container';
import Duplicate from '../reactive-autowired/duplicate.ts';
import type Source from '../reactive-autowired/source.ts';

@target([Target.Type.Field])
export class ReactiveAutowired extends Metadata {}

function postConstruct(
  metadata: ReactiveAutowired,
  appCtx: ApplicationContext,
  name: string
) {
  const enqueueUpdate = (v) => {
    get(NAME.enqueueSetState)?.(this, name, v);
  };
  const cls: any = metadata.value;
  let _value: any = new cls();
  // 获取cls对应的store
  const source: Source = appCtx.getBean(cls)['source'];
  const duplicate = new Duplicate(enqueueUpdate);
  source.add(duplicate);
  Object.defineProperty(this, name, {
    configurable: false,
    enumerable: true,
    get: function () {
      return _value;
    },
    set(v: any): boolean {
      if (get(NAME.isRenderPhase)?.()) {
        _value = v;
      } else {
        source.enqueueAllDuplicateUpdate(v);
      }
      return true;
    },
  });
}

export default genDecorator<void, FieldContext>(ReactiveAutowired, {
  postConstruct,
  optional: true,
});
