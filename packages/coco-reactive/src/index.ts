import { register, NAME } from 'shared';

import { default as reactive, Reactive } from './decorator/reactive.ts';

export { reactive, Reactive };

register(NAME.Reactive, Reactive);
