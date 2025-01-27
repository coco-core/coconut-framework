import Target from './target.ts';
import target from '../decorator/target.ts';
import Metadata from '../metadata/metadata.ts';
import { Scope } from './component.ts';

export type Args = Class<any> | { cls: Class<any>; scope: Scope };

@target([Target.Type.Method])
class Bean extends Metadata {
  value: Class<any>;

  scope: Scope = Scope.Singleton;
}

export default Bean;
