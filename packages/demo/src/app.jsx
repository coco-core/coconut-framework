import { reactive } from "coconut";
import Button from "./components/button";

export default class App {

  @reactive
  show = true;

  handleClick = () => {
    this.show = !this.show;
  };

  render = () => {
    return <div>
      <button onClick={this.handleClick}>click me</button>
      {
        this.show && <Button />
      }
    </div>
  }
}