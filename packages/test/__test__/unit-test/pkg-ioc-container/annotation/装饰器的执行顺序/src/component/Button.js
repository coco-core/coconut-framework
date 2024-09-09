import { component } from 'coco-mvc';
import { a } from '../decorator/a';
import { b } from '../decorator/b';

@a('button')
@b('button')
@component()
class Button {
}

export default Button