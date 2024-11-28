import { register, NAME } from 'shared';

import { default as reactive, Reactive } from './decorator/reactive.ts';
export { reactive, Reactive };
export { default as memoized, Memoized } from './decorator/memoized.ts';
export { default as store, Store } from './decorator/store.ts';
import {
  default as reactiveAutowired,
  ReactiveAutowired,
} from './decorator/reactive-autowired.ts';
export { reactiveAutowired, ReactiveAutowired };

register(NAME.Reactive, Reactive);
register(NAME.ReactiveAutowired, ReactiveAutowired);
