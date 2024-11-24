import { _test_helper } from 'coco-mvc';
import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { render } from '../../../../helper/render';
import { getByText, queryAllByRole, waitFor } from '@testing-library/dom';

let ApplicationContext;
let renderApp;
let throwError;
let Button;
let Button1;
let memoizedFn;
describe('memoized', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Button = (await import('./src/view/button.tsx')).default;
      memoizedFn = (await import('./src/view/button.tsx')).memoizedFn;
      Button1 = (await import('./src/view/button1.tsx')).default;
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

  test('memoized直接依赖reactive，且可以缓存上次的值', async () => {
    const { container } = render(ApplicationContext, renderApp, Button);
    const buttons = queryAllByRole(container, 'button');
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toBeTruthy();
    expect(buttons[1]).toBeTruthy();
    expect(getByText(container, '张三:1')).toBeTruthy();
    buttons[0].click();
    await waitFor(async () => {
      expect(getByText(container, '张三:2')).toBeTruthy();
      buttons[1].click();
      await waitFor(() => {
        expect(getByText(container, '李四:2')).toBeTruthy();
        expect(memoizedFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  test('memoized a依赖reactive a，memoized b依赖memoized a，当reactive a更新时，memoized b也能更新', async () => {
    const { container } = render(ApplicationContext, renderApp, Button1);
    const buttons = queryAllByRole(container, 'button');
    expect(buttons.length).toBe(1);
    expect(buttons[0]).toBeTruthy();
    expect(getByText(container, '张三：1分')).toBeTruthy();
    buttons[0].click();
    await waitFor(async () => {
      expect(getByText(container, '张三：2分')).toBeTruthy();
    });
  });
});
