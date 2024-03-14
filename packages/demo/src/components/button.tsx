
@Component
export default class Button {
  @reactive
  num: number = 0;

  render = () => {
    return <div>click me! {this.num}</div>
  }
}