import Start from '../metadata/start.ts';
import genDecorator from './gen-decorator-exp.ts';
import { MethodContext } from './decorator-context.ts';

export default genDecorator<undefined, MethodContext>(Start, {
  optional: true,
});
