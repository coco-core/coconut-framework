import { view, render } from 'coco-mvc';

@view()
class Button {

  @render()
  fn () {
    return <button>btn</button>
  }
}

export default Button