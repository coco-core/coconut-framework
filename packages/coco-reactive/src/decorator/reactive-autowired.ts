import { genDecorator } from 'coco-ioc-container';
import Remote from '../reactive-autowired/remote.ts';
import { sym_remote } from './store.ts';
import { customPostConstruct } from './reactive.ts';
import ReactiveAutowired from '../metadata/reactive-autowired.ts';

const postConstruct = customPostConstruct({
  init: (metadata: ReactiveAutowired, appCtx, name, enqueueSetState) => {
    const cls: any = metadata.value;
    const remote: Remote = appCtx.getBean(cls)[sym_remote];
    remote.fork().setEnqueueUpdate(enqueueSetState);
    return remote;
  },
  initValue: (remote: Remote) => {
    return remote.pull();
  },
  enqueueSetState(remote: Remote, v: any) {
    remote.push(v);
  },
});

export default genDecorator<void, ClassFieldDecoratorContext>(
  ReactiveAutowired,
  {
    postConstruct,
    optional: true,
  }
);
