import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

@target([Target.Type.Class])
class Configuration extends Metadata {}

export default Configuration;
