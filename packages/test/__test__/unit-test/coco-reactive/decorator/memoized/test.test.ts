import { _test_helper } from 'coco-mvc';
import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

import { getByText, queryAllByRole, waitFor } from '@testing-library/dom';

let _ApplicationContext;
let throwError;
let Button;
let Button1;
let memoizedFn;
let render;
describe('memoized', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
      const { default: _Button, memoizedFn: _memoizedFn } = await import(
        './src/view/button.tsx'
      );
      memoizedFn = _memoizedFn;
      Button = _Button;
      const { default: _Button1 } = await import('./src/view/button1.tsx');
      Button1 = _Button1;
      // todo 这个render每次需要更新的，不然就是上次的render上下文，导致元数据，beanDefinition都被情况了
      // 把render和new ApplicationContext合并吧
      const { render: _r } = await import('../../../../helper/render.tsx');
      render = _r;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clearMetadata();
    _test_helper.iocContainer.clearBeanDefinition();
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
    const context = new _ApplicationContext();
    const container = render(Button1);
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
