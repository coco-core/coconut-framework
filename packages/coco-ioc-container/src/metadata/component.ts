import Metadata from '../metadata/metadata.ts';
import Target from './target.ts';
import target from '../decorator/target.ts';

export type BeanName = string;

@target([Target.Type.Class])
class Component extends Metadata {}

export default Component;
