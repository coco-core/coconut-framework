import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './decorator.ts';
import { ClassContext } from './decorator-context.ts';

@target([Target.Type.Class])
export class Configuration extends Metadata {}

export default genDecorator<void, ClassContext>(Configuration, {
  optional: true,
});
