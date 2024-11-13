import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../helper/pkg-path';
import { render } from '../../../helper/render';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';

let _ApplicationContext;
let throwError;
let App;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext, App: _App } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
      App = _App;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    jest.resetModules();
    throwError = false;
  });

  test('正常渲染父子组件', async () => {
    const context = new _ApplicationContext();
    const container = render(App);
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
