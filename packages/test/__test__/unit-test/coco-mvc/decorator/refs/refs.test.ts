import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

export const mockFn = jest.fn();

let ApplicationContext;
let Render;
let Router;
let throwError;
let Button;
describe('refs', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Render = (await import('coco-mvc')).Render;
      Router = (await import('coco-mvc')).Router;
      Button = (await import(cocoIdxStr)).Button;
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

  test('支持函数形式绑定host组件或自定义组件', async () => {
    const { container } = _test_helper.mvc.render(
      ApplicationContext,
      Button,
      Render,
      Router
    );
    const button = getByRole(container, 'button');
    expect(button).toBeTruthy();
    expect(getByText(button, 'btn')).toBeTruthy();
    button.click();
    expect(mockFn).toHaveBeenCalledWith('id', 'view-component');
  });
});
