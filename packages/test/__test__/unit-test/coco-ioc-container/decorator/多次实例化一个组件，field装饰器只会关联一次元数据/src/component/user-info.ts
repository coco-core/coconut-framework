import { component, bean } from 'coco-mvc';
import validate from '../decorator/validate.ts';

@component()
class UserInfo {
  @validate()
  name: string = '';
}

export default UserInfo;
