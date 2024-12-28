import { get, NAME } from 'shared';
import { genDecorator, type ApplicationContext } from 'coco-ioc-container';
import Publisher from '../memoized/publisher.ts';
import Subscriber from '../memoized/subscriber.ts';
import Reactive from '../metadata/reactive.ts';

export function customPostConstruct(hooks?: {
  /**
   * 自定义初始化工作，返回值作为参数传递给其他的hook
   */
  init?: (
    metadata: Reactive,
    appCtx: ApplicationContext,
    name: string,
    enqueueUpdate: (v: any) => void
  ) => any;
  // 值的初始化
  initValue?: (initRtn: any) => any;
  // 在获取值之前
  preGetter?: (initRtn: any) => void;
  // 在排队操作之前
  preEnqueueUpdate?: (initRtn: any) => void;
  // 自定义的排队
  enqueueUpdate?: (initRtn: any, v: any) => void;
}) {
  return function postConstruct(
    metadata: Reactive,
    appCtx: ApplicationContext,
    name: string
  ) {
    const enqueueUpdate = (v: any) => {
      get(NAME.enqueueSetState)?.(this, name, v);
    };
    const initRtn = hooks?.init?.(metadata, appCtx, name, enqueueUpdate);
    let _value: any = hooks?.initValue ? hooks.initValue(initRtn) : this[name];
    const publisher = new Publisher(name);
    Object.defineProperty(this, name, {
      configurable: false,
      enumerable: true,
      get: function () {
        if (Subscriber.Executing) {
          Subscriber.Executing.subscribe(publisher);
        }
        hooks?.preGetter?.(initRtn);
        return _value;
      },
      set(v: any): boolean {
        if (get(NAME.isRenderPhase)?.()) {
          _value = v;
        } else {
          publisher.notify();
          hooks?.preEnqueueUpdate?.(initRtn);
          hooks?.enqueueUpdate
            ? hooks.enqueueUpdate(initRtn, v)
            : enqueueUpdate(v);
        }
        return true;
      },
    });
  };
}

const postConstruct = customPostConstruct();

export default genDecorator<
  void,
  ClassFieldDecoratorContext | ClassDecoratorContext
>(Reactive, {
  postConstruct,
  optional: true,
});
