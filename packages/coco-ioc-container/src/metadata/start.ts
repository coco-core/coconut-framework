import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './metadata.ts';

@target([Target.Type.Method])
class Start extends Metadata {
  value: Class<any>[];
}

export default Start;
