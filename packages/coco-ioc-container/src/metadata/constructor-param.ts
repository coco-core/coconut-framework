import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';

export type ClassList = Function[];

@target([Target.Type.Class])
class ConstructorParam extends Metadata {
  value: ClassList;
}

export default ConstructorParam;
