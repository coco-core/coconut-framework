import { view, reactive, bind, autowired } from 'coco-mvc';
import UserInfo from '../store/user-info.ts';

@view()
class Form {
  @autowired(UserInfo)
  userInfo: UserInfo;

  label() {
    return `input:${this.userInfo.name}`;
  }

  @view()
  h() {
    return <input>{this.label()}</input>;
  }
}

export default Form;
