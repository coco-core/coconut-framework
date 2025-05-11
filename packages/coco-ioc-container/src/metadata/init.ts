import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

@target([Target.Type.Method])
class Init extends Metadata {
  value: Class<any>[];
}

export default Init;
