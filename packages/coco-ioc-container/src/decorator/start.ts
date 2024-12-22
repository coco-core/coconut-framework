import target, { Target } from './target.ts';
import Metadata from './metadata.ts';
import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';

@target([Target.Type.Method])
export class Start extends Metadata {
  value: Class<any>[];
}

export default genDecorator<undefined, MethodContext>(Start, {
  optional: true,
});
