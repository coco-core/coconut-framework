import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

@target([Target.Type.Field])
class Value extends Metadata {
  value: string;
}

export default Value;
