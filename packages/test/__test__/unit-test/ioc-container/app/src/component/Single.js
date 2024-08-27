import { component, scope, ScopeType } from 'coco-mvc';

@scope(ScopeType.Singleton)
@component()
class Single {
}

export default Single