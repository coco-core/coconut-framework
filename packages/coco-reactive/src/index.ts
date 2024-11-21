import { register, NAME } from 'shared';

import { default as reactive, Reactive } from './decorator/reactive.ts';
export { reactive, Reactive };
export { default as memoized, Memoized } from './decorator/memoized.ts';

register(NAME.Reactive, Reactive);
