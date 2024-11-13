import { build } from '@cocofw/cli';
// todo 优化成@/helper/pkg-path
import { pkgPath, cocoIdxStr } from '../../../helper/pkg-path';
import { render } from '../../../helper/render';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryAllByRole,
  waitFor,
} from '@testing-library/dom';

let _ApplicationContext;
let throwError;
let App;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext, App: _App } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
      App = _App;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    jest.resetModules();
    throwError = false;
  });

  test('正常渲染父子组件', async () => {
    const context = new _ApplicationContext();
    const container = render(App);
    const header = getByRole(container, 'heading');
    const buttons = queryAllByRole(header, 'button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe('count:1');
    expect(buttons[1].textContent).toBe('count:1');
    buttons[0].click();
    await waitFor(async () => {
      expect(buttons[0].textContent).toBe('count:2');
      buttons[1].click();
      await waitFor(() => {
        expect(buttons[1].textContent).toBe('count:2');
      });
    });
  });
});
