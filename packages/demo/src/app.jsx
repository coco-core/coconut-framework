import { reactive, view, component } from "coconut";

@component
export default class App {

  @reactive
  count = 1;

  handleClick = () => {
    this.count += 1;
  };

  @view
  render = () => {
    return <section className="app">
      <h1 onClick={this.handleClick}>我第{this.count}</h1>
      <p>^ ~ ^</p>
    </section>
  }
}