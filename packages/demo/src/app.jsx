import { reactive } from "coconut";
import Button from "./components/button";

export default class App {

  @reactive
  count = true;

  handleClick = () => {
    this.count++;
  };

  render = () => {
    return <div className="app">
      <h1>Welcome to My React App</h1>
      <p>This React app is loaded from a CDN!</p>
    </div>
  }
}