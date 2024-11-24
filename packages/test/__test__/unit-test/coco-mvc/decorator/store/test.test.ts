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
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Page;
let Form;
let Detail;
let renderApp;
describe('store', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Form = (await import(cocoIdxStr)).Form;
      Detail = (await import(cocoIdxStr)).Detail;
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

  test('不同的组件注入同一个全局状态', async () => {
    const { ctx } = render(ApplicationContext, renderApp, Page);
    const form = ctx.getBean(Form);
    const detail = ctx.getBean(Detail);
    expect(form.userInfo === detail.userInfo).toBe(true);
  });
});
