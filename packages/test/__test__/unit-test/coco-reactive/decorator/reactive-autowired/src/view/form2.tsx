import { view, bind, reactiveAutowired, memoized, reactive } from 'coco-mvc';
import UserInfo from '../store/user-info.ts';

const memoizedFn = jest.fn();
const memoizedFn1 = jest.fn();

@view()
class Form2 {
  @reactive()
  showName = true;

  @reactiveAutowired(UserInfo)
  userInfo: UserInfo;

  @reactive()
  score = 1;

  @bind()
  onAddScore() {
    this.score += 1;
  }

  @memoized()
  text() {
    memoizedFn();
    if (this.showName) {
      return `${this.userInfo?.name}:${this.score}`;
    } else {
      return `匿名:${this.score}`;
    }
  }

  @memoized()
  myLabel() {
    memoizedFn1();
    return `${this.text()}分`;
  }

  @bind()
  handleChangeShow() {
    this.showName = false;
  }

  @bind()
  handleClick() {
    const newName = this.userInfo.name + '四';
    this.userInfo = { name: newName };
  }

  @view()
  h() {
    return (
      <div>
        <button onClick={this.handleChangeShow}>update show</button>
        <button onClick={this.handleClick}>update name</button>
        <button onClick={this.onAddScore}>click to add score</button>
        <input>{this.myLabel()}</input>
      </div>
    );
  }
}

export default Form2;
export { memoizedFn, memoizedFn1 };
