import { genDotCoco } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path.ts';
import {
  getAllByRole,
  getByLabelText,
  getByRole,
  getByText,
  queryAllByRole,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let Render;
let Router;
let throwError;
let Page;
let Form;
let Detail;
let UserInfo;
let Page1;
let memoizedFn1;
let Page2;
let memoizedFn21;
let memoizedFn22;

describe('store', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Render = (await import('coco-mvc')).Render;
      Router = (await import('coco-mvc')).Router;
      Page = (await import(cocoIdxStr)).Page;
      Form = (await import(cocoIdxStr)).Form;
      Detail = (await import(cocoIdxStr)).Detail;
      Page1 = (await import(cocoIdxStr)).Page1;
      memoizedFn1 = (await import('./src/view/form1.tsx')).memoizedFn;
      Page2 = (await import(cocoIdxStr)).Page2;
      memoizedFn21 = (await import('./src/view/form2.tsx')).memoizedFn;
      memoizedFn22 = (await import('./src/view/form2.tsx')).memoizedFn1;
      UserInfo = (await import(cocoIdxStr)).UserInfo;
    } catch (e) {
      console.info(e);
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.mvc.cleanRender();
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('不同的组件注入不同的实例', async () => {
    const { ctx } = _test_helper.mvc.render(
      ApplicationContext,
      Page,
      Render,
      Router
    );
    const form = ctx.getBean(Form);
    const detail = ctx.getBean(Detail);
    // todo userInfo是否需要是UserInfo的实例
    expect(form.userInfo).toBeInstanceOf(UserInfo);
    expect(detail.userInfo).toBeInstanceOf(UserInfo);
    expect(form.userInfo === detail.userInfo).toBe(false);
  });

  test('一个组件修改了store的reactive属性，其他组件也会同步更新', async () => {
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      Page,
      Render,
      Router
    );
    const input = getByRole(container, 'textbox');
    expect(getByText(input, 'input:张三')).toBeTruthy();
    const heading = getByRole(container, 'heading');
    expect(getByText(heading, '展示:张三')).toBeTruthy();
    input.click();
    await waitFor(() => {
      expect(getByText(input, 'input:李四')).toBeTruthy();
      expect(getByText(heading, '展示:李四')).toBeTruthy();
    });
  });

  test('单个组件内，memoized可以依赖reactiveAutowired，也可以取消依赖', async () => {
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      Page1,
      Render,
      Router
    );
    const buttons = getAllByRole(container, 'button');
    const input = getByRole(container, 'textbox');
    expect(getByText(input, 'input:张三')).toBeTruthy();
    const heading = getByRole(container, 'heading');
    expect(getByText(heading, '展示:张三')).toBeTruthy();
    expect(memoizedFn1).toHaveBeenCalledTimes(1);
    buttons[1].click();
    await waitFor(async () => {
      expect(getByText(input, 'input:张三1')).toBeTruthy();
      expect(getByText(heading, '展示:张三1')).toBeTruthy();
      expect(memoizedFn1).toHaveBeenCalledTimes(2);
      buttons[0].click();
      await waitFor(async () => {
        expect(getByText(input, '不依赖reactiveAutowired')).toBeTruthy();
        expect(getByText(heading, '展示:张三1')).toBeTruthy();
        expect(memoizedFn1).toHaveBeenCalledTimes(3);
        buttons[1].click();
        await waitFor(async () => {
          expect(getByText(input, '不依赖reactiveAutowired')).toBeTruthy();
          expect(getByText(heading, '展示:张三11')).toBeTruthy();
          expect(memoizedFn1).toHaveBeenCalledTimes(3);
        });
      });
    });
  });

  test('单个组件内部，memoized a 依赖memoized b, memoized b取消依赖reactiveAutowired，再修改reactiveAutowired，memoized a也不会重新计算', async () => {
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      Page2,
      Render,
      Router
    );
    const buttons = getAllByRole(container, 'button');
    const input = getByRole(container, 'textbox');
    expect(getByText(input, '张三:1分')).toBeTruthy();
    const heading = getByRole(container, 'heading');
    expect(getByText(heading, '展示:张三')).toBeTruthy();
    expect(memoizedFn21).toHaveBeenCalledTimes(1);
    expect(memoizedFn22).toHaveBeenCalledTimes(1);
    buttons[1].click();
    await waitFor(async () => {
      expect(getByText(input, '张三四:1分')).toBeTruthy();
      expect(getByText(heading, '展示:张三四')).toBeTruthy();
      expect(memoizedFn21).toHaveBeenCalledTimes(2);
      expect(memoizedFn22).toHaveBeenCalledTimes(2);
      buttons[2].click();
      await waitFor(async () => {
        expect(getByText(input, '张三四:2分')).toBeTruthy();
        expect(getByText(heading, '展示:张三四')).toBeTruthy();
        expect(memoizedFn21).toHaveBeenCalledTimes(3);
        expect(memoizedFn22).toHaveBeenCalledTimes(3);
        buttons[0].click();
        await waitFor(async () => {
          expect(getByText(input, '匿名:2分')).toBeTruthy();
          expect(getByText(heading, '展示:张三四')).toBeTruthy();
          expect(memoizedFn21).toHaveBeenCalledTimes(4);
          expect(memoizedFn22).toHaveBeenCalledTimes(4);
          buttons[2].click();
          await waitFor(async () => {
            expect(getByText(input, '匿名:3分')).toBeTruthy();
            expect(getByText(heading, '展示:张三四')).toBeTruthy();
            expect(memoizedFn21).toHaveBeenCalledTimes(5);
            expect(memoizedFn22).toHaveBeenCalledTimes(5);
            buttons[1].click();
            await waitFor(async () => {
              expect(getByText(input, '匿名:3分')).toBeTruthy();
              expect(getByText(heading, '展示:张三四四')).toBeTruthy();
              expect(memoizedFn21).toHaveBeenCalledTimes(5);
              expect(memoizedFn22).toHaveBeenCalledTimes(5);
            });
          });
        });
      });
    });
  });
});
