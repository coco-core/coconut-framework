import { component, bean } from 'coco-mvc';
import validate from '../decorator/validate.ts';

@component()
class Application {
  @validate()
  name: string = '';
}

export default Application;
