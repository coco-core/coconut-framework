import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

/**
 * @public
 */
@target([Target.Type.Field])
class Autowired extends Metadata {
  value: Class<any>;
}

export default Autowired;
