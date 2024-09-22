import {component} from 'coco-mvc'
import a from '../decorator/a';
import b from '../decorator/b';

@a()
@b()
@component()
class Button {
}

export default Button