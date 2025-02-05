import { _test_helper } from 'coco-mvc';
import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { getByText, waitFor } from '@testing-library/dom';

let ApplicationContext;
let Render;
let Router;
let throwError;
describe('router', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Render = (await import('coco-mvc')).Render;
      Router = (await import('coco-mvc')).Router;
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
    const { container, ctx } = _test_helper.mvc.start(
      ApplicationContext,
      Render,
      Router
    );
    const router = ctx.getComponent(Router);
    router.navigateTo('/');
    await waitFor(async () => {
      expect(getByText(container, 'index page')).toBeTruthy();
      router.navigateTo('/todo-page');
      await waitFor(() => {
        expect(getByText(container, 'todo page')).toBeTruthy();
      });
    });
  });
});
