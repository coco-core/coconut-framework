import { _test_helper as cli_helper } from '@cocojs/cli';
import { getByRole, getByText, waitFor } from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';
import { pkgPath, cocoIdxStr, cocoIdxAppJson } from '../../_helper_/pkg-path';

export const appDidMount = jest.fn();

let ApplicationContext;
let applicationJson;
let Render;
let Router;
let throwError;
let App;
describe('viewDidMount', () => {
  beforeEach(async () => {
    cli_helper.prepareBuild(pkgPath(__dirname));
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    applicationJson = (await import(cocoIdxAppJson)).default;
    Render = (await import('coco-mvc')).Render;
    Router = (await import('coco-mvc')).Router;
    App = (await import('./src/view/app.tsx')).default;
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
      Router,
      applicationJson
    );
    const header = getByRole(container, 'heading');
    const button = getByRole(header, 'button');
    expect(button).toBeTruthy();
    expect(getByText(button, 'count:1')).toBeTruthy();
    expect(appDidMount).toHaveBeenCalledTimes(1);
  });
});
