import { get, NAME } from 'shared';
import {
  Metadata,
  target,
  Target,
  genDecorator,
  type ApplicationContext,
  type FieldContext,
} from 'coco-ioc-container';
import type Remote from '../reactive-autowired/remote.ts';
import { sym_remote } from './store.ts';

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
  const remote: Remote = appCtx.getBean(cls)[sym_remote];
  remote.fork().setEnqueueUpdate(enqueueUpdate);
  let _value: any = remote.pull();
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
        remote.push(v);
      }
      return true;
    },
  });
}

export default genDecorator<void, FieldContext>(ReactiveAutowired, {
  postConstruct,
  optional: true,
});
