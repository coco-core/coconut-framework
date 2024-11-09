import { component, scope, Scope } from 'coco-mvc';

@component()
@scope(Scope.Type.Singleton)
class Single {}

export default Single;
