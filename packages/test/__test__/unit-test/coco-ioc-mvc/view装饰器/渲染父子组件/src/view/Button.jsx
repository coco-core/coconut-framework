import { view, render, reactive } from 'coco-mvc';

@view()
class Button {

  @reactive()
  count = 1;

  onClick() {
    this.count = 2;
  }

  @render()
  fn () {
    return <button onClick={this.onClick}>count:{this.count}</button>
  }
}

export default Button