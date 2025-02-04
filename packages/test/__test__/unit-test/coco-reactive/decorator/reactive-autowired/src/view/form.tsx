import { view, bind, reactiveAutowired, memoized } from 'coco-mvc';
import UserInfo from '../store/user-info.ts';

@view()
class Form {
  @reactiveAutowired()
  userInfo: UserInfo;

  label() {
    return `input:${this.userInfo.name}`;
  }

  @bind()
  handleClick() {
    this.userInfo = { name: '李四' };
  }

  @view()
  h() {
    return <input onClick={this.handleClick}>input:{this.userInfo.name}</input>;
  }
}

export default Form;
