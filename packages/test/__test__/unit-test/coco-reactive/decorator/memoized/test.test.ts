import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { render } from '../../../../helper/render';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryAllByRole,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';

let _ApplicationContext;
let throwError;
let Button;
let memoizedFn;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext, Button: _Button } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
      Button = _Button;
      const { memoizedFn: _memoizedFn } = await import('./src/view/button.tsx');
      memoizedFn = _memoizedFn;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    jest.resetModules();
    throwError = false;
  });

  test('memoized直接依赖reactive，且可以缓存上次的值', async () => {
    const context = new _ApplicationContext();
    const container = render(Button);
    const buttons = queryAllByRole(container, 'button');
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toBeTruthy();
    expect(buttons[1]).toBeTruthy();
    expect(getByText(container, 'zhangsan:1')).toBeTruthy();
    buttons[0].click();
    await waitFor(async () => {
      expect(getByText(container, 'zhangsan:2')).toBeTruthy();
      buttons[1].click();
      await waitFor(() => {
        expect(getByText(container, 'lisi:2')).toBeTruthy();
        expect(memoizedFn).toHaveBeenCalledTimes(2);
      });
    });
  });
});
