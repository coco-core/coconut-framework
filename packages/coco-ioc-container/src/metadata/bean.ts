import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';
import { Type } from './scope.ts';

export type Args = Class<any> | { cls: Class<any>; scope: Type };

@target([Target.Type.Method])
class Bean extends Metadata {
  value: Class<any>;

  scope: Type = Type.Singleton;
}

export default Bean;
