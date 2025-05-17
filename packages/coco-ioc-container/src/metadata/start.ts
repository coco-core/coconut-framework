import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

/**
 * @public
 */
@target([Target.Type.Method])
class Start extends Metadata {
  value: Class<any>[];
}

export default Start;
