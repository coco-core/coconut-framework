import { view, reactive, bind, computed } from 'coco-mvc';

@view()
class Button {
  @reactive()
  count = 1;

  label() {
    return `count:${this.count}`;
  }

  @bind()
  onClick() {
    this.count = 2;
  }

  @view()
  h() {
    return <button onClick={this.onClick}>{this.label()}</button>;
  }
}

export default Button;
