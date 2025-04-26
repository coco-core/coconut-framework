import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';

@target([Target.Type.Field])
class Qualifier extends Metadata {
  value: string;
}

export default Qualifier;
