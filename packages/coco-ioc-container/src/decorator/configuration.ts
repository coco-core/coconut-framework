import genDecorator from './gen-decorator-exp.ts';
import { ClassContext } from './decorator-context.ts';
import Configuration from '../metadata/configuration.ts';

export default genDecorator<void, ClassContext>(Configuration, {
  optional: true,
});
