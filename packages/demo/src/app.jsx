import { reactive } from "coconut";
import Button from "./components/button";

export default class App {

  @reactive
  count = true;

  handleClick = () => {
    console.log('=======click!===========');
  };

  render = () => {
    return <div className="app">
      <h1 onClick={this.handleClick}>Welcome to My React App</h1>
      <p>This React app is loaded from a CDN!</p>
    </div>
  }
}