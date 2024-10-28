import { component } from 'coco-mvc';
import a from '../decorator/a';
import b from '../decorator/b';

@component()
class Button {
  @a()
  @b()
  count;
}

export default Button;
