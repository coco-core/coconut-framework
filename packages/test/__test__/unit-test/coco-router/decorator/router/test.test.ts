import { _test_helper } from 'coco-mvc';
import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { getByText, queryAllByRole, waitFor } from '@testing-library/dom';

let ApplicationContext;
let WebRender;
let HistoryRouter;
let throwError;
let IndexPage;
let TodoPage;
describe('router', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      WebRender = (await import('coco-mvc')).WebRender;
      HistoryRouter = (await import('coco-mvc')).HistoryRouter;
      IndexPage = (await import(cocoIdxStr)).IndexPage;
      TodoPage = (await import(cocoIdxStr)).TodoPage;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    _test_helper.mvc.cleanRender();
    jest.resetModules();
    throwError = false;
  });

  test('路由切换，页面也会重新渲染', async () => {
    // todo 这一步改为路由跳转到/
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      IndexPage,
      WebRender,
      HistoryRouter
    );
    await waitFor(async () => {
      expect(getByText(container, 'index page')).toBeTruthy();
      // todo 这一步改为路由跳转到/todo-page
      _test_helper.mvc.render(
        ApplicationContext,
        TodoPage,
        WebRender,
        HistoryRouter
      );
      await waitFor(() => {
        expect(getByText(container, 'todo page')).toBeTruthy();
      });
    });
  });
});
