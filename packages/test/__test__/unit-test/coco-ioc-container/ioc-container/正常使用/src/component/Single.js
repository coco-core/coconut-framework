import { component, scope, Scope } from 'coco-mvc';

@scope(Scope.Type.Singleton)
@component()
class Single {
}

export default Single