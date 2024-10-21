import { view, reactive } from 'coco-mvc';

@view()
class Button {

  @reactive()
  count = 1;

  onClick() {
    this.count = 2;
  }

  @view()
  h () {
    return <button onClick={this.onClick}>count:{this.count}</button>
  }
}

export default Button