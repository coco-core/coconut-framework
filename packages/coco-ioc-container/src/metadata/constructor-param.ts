import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from './abstract/metadata.ts';

export type ClassList = Class<any>[];

@target([Target.Type.Class])
class ConstructorParam extends Metadata {
  value: ClassList;
}

export default ConstructorParam;
