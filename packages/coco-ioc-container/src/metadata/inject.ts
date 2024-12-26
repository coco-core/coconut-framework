import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';

export type Args = Class<any>[];

@target([Target.Type.Class])
class Inject extends Metadata {
  value: Class<any>[];
}

export default Inject;
