import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path.ts';
import { render } from '../../../../helper/render.tsx';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryAllByRole,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Page;
let Form;
let Detail;
let UserInfo;
let renderApp;
describe('store', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Page = (await import(cocoIdxStr)).Page;
      Form = (await import(cocoIdxStr)).Form;
      Detail = (await import(cocoIdxStr)).Detail;
      UserInfo = (await import(cocoIdxStr)).UserInfo;
      renderApp = (await import('coco-mvc')).renderApp;
    } catch (e) {
      console.info(e);
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('不同的组件注入不同的全局实例', async () => {
    const { ctx } = render(ApplicationContext, renderApp, Page);
    const form = ctx.getBean(Form);
    const detail = ctx.getBean(Detail);
    expect(form.userInfo).toBeInstanceOf(UserInfo);
    expect(detail.userInfo).toBeInstanceOf(UserInfo);
    expect(form.userInfo === detail.userInfo).toBe(false);
  });

  test('一个组件修改了store的reactive属性，其他组件也会同步更新', async () => {
    const { container } = render(ApplicationContext, renderApp, Page);
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
});
