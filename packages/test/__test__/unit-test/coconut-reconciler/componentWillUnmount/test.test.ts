import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../helper/pkg-path';
import { getByRole, getByText, waitFor } from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

export const buttonWillUnmount = jest.fn();

let ApplicationContext;
let Render;
let Router;
let throwError;
let App;
describe('componentWillUnmount', () => {
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

  test('componentWillUnmount被调用', async () => {
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
    header.click();
    await waitFor(() => {
      expect(getByText(header, 'not show')).toBeTruthy();
      expect(buttonWillUnmount).toHaveBeenCalledTimes(1);
    });
  });
});
