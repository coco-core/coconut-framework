import { component, scope, Scope } from 'coco-mvc';
import a from '../decorator/a';
import b from '../decorator/b';

@a()
@b()
@scope(Scope.Type.Singleton)
@component()
class Button {}

export default Button;
