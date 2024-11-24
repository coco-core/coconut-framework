import { store } from 'coco-mvc';

@store()
class UserInfo {
  name: string = '张三';

  age: number;
}

export default UserInfo;
