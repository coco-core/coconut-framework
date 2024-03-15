import { createVirtualDom } from 'decor-framework';
import { updateRender } from 'decor-framework';

export default class Button {
  count: number = 22;

  handleClick = () => {
    this.count++;
    updateRender();
  };

  render = () => {
    return createVirtualDom('div', {
      children: [
        createVirtualDom('span', { innerText: `hello decor!! ${this.count}` }),
      ],
      onClick: this.handleClick,
    });
  };
}
