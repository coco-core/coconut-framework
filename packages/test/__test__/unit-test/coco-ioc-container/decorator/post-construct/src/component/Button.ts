import { component, Component } from 'coco-mvc';
import a from '../decorator/a';
import b from '../decorator/b';

@a()
@b()
@component(Component.Scope.Singleton)
class Button {}

export default Button;
