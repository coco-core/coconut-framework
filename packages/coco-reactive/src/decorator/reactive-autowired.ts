import { genDecorator, type FieldContext } from 'coco-ioc-container';
import Remote from '../reactive-autowired/remote.ts';
import { sym_remote } from './store.ts';
import { customPostConstruct } from './reactive.ts';
import ReactiveAutowired from '../metadata/reactive-autowired.ts';

const postConstruct = customPostConstruct({
  init: (metadata, appCtx, name, enqueueUpdate) => {
    const cls: any = metadata.value;
    const remote: Remote = appCtx.getBean(cls)[sym_remote];
    remote.fork().setEnqueueUpdate(enqueueUpdate);
    return remote;
  },
  initValue: (remote: Remote) => {
    return remote.pull();
  },
  enqueueUpdate(remote: Remote, v: any) {
    remote.push(v);
  },
});

export default genDecorator<void, FieldContext>(ReactiveAutowired, {
  postConstruct,
  optional: true,
});
