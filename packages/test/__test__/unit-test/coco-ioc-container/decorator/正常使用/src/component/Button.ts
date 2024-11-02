import { component, scope, Scope } from 'coco-mvc';

@scope(Scope.Type.Singleton)
@component()
class Button {}

export default Button;
