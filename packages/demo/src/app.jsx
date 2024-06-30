import { reactive } from "coconut";
import Button from "./components/button";

export default class App {

  @reactive
  count = 1;

  handleClick = () => {
    console.log('=======click!===========');
    this.count += 1;
  };

  render = () => {
    return <section className="app">
      <h1 onClick={this.handleClick}>我第{this.count}</h1>
      <p>^ ~ ^</p>
    </section>
  }
}