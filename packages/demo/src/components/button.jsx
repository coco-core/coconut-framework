import { reactive } from 'coconut-framework';

export default class Button {

  @reactive
  count = 22;

  handleClick = () => {
    this.count++;
  };

  // todo 如果使用ts的话，transform-jsx的转移有问题
  render = () => {
    return <div onClick={this.handleClick}>
      <span>{this.count}</span>
    </div>
  };
}
