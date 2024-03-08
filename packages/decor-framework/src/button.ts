import {Component, createVirtualDom} from "./component";

export default class Button extends Component {
  render = () => {
    return createVirtualDom('div', { children: "hello decor!!"});
  }
}