import Metadata from './abstract/metadata.ts';
import target, { Type } from '../decorator/target.ts';

/**
 * @public
 */
@target([Type.Class], true)
class Target extends Metadata {
  static Type = Type;

  value: Type[];
}

export default Target;
