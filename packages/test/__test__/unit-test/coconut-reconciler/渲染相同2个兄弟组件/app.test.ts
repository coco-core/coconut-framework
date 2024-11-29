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
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let App;
let renderApp;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      App = (await import(cocoIdxStr)).App;
      renderApp = (await import('coco-mvc')).renderApp;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('正常渲染父子组件', async () => {
    const context = new ApplicationContext();
    const { container } = render(ApplicationContext, renderApp, App);
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
