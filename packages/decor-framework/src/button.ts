import {createVirtualDom} from "./component";
import {updateRender} from "./reconciler";

export default class Button {
  count: number = 22;

  handleClick = () => {
    this.count++;
    console.log('=======handle click===========', this.count);
    updateRender();
  }

  render = () => {
    return createVirtualDom('div', {
      children: [
        createVirtualDom('span', {innerText: `hello decor!! ${this.count}`})
      ],
      onClick: this.handleClick
    });
  }
}