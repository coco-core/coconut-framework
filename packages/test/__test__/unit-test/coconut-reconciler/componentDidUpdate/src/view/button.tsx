import { view, reactive, bind } from 'coco-mvc';
import { buttonDidUpdate } from '../../test.test.ts';

@view()
class Button {
  @reactive()
  count = 1;

  @bind()
  onClick() {
    this.count = 2;
  }

  componentDidUpdate(prevProps, { count: prevCount }) {
    buttonDidUpdate(prevCount);
  }

  @view()
  fn() {
    return <button onClick={this.onClick}>count:{this.count}</button>;
  }
}

export default Button;
