import { view, reactive, bind } from 'coco-mvc';
import { buttonWillUnmount } from '../../test.test.ts';

@view()
class Button {
  @reactive()
  count = 1;

  componentWillUnmount() {
    buttonWillUnmount();
  }

  render() {
    return <button>count:{this.count}</button>;
  }
}

export default Button;
