import { component, scope, ScopeType } from 'coco-mvc';


@scope(ScopeType.Singleton)
@component()
class Button {
}

export default Button