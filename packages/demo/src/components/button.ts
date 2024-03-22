import { createVirtualDom, reactive } from 'decor-framework';

export default class Button {

  @reactive
  count: number = 22;

  handleClick = () => {
    this.count++;
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
