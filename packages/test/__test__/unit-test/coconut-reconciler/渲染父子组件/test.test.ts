import { genDotCoco } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../helper/pkg-path';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let Render;
let Router;
let throwError;
let App;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Render = (await import('coco-mvc')).Render;
      Router = (await import('coco-mvc')).Router;
      App = (await import(cocoIdxStr)).App;
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

  test('正常渲染父子组件', async () => {
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      App,
      Render,
      Router
    );
    const header = getByRole(container, 'heading');
    const button = getByRole(header, 'button');
    expect(button).toBeTruthy();
    expect(getByText(button, 'count:1')).toBeTruthy();
    button.click();
    await waitFor(() => {
      expect(getByText(button, 'count:2')).toBeTruthy();
    });
  });
});
