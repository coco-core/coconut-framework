import { _test_helper as cli_helper } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../helper/pkg-path';
import { getByRole, getByText, waitFor } from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

export const appDidMount = jest.fn();
export const buttonDidUpdate = jest.fn();

let ApplicationContext;
let Render;
let Router;
let throwError;
let App;
describe('viewDidUpdate', () => {
  beforeEach(async () => {
    try {
      cli_helper.prepareBuild(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Render = (await import('coco-mvc')).Render;
      Router = (await import('coco-mvc')).Router;
      App = (await import('./src/view/app.tsx')).default;
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

  test('App的viewDidMount被调用', async () => {
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
    expect(appDidMount).toHaveBeenCalledTimes(1);
    button.click();
    await waitFor(() => {
      expect(getByText(button, 'count:2')).toBeTruthy();
      expect(buttonDidUpdate).toHaveBeenCalledTimes(1);
      expect(buttonDidUpdate).toHaveBeenCalledWith(1);
    });
  });
});
