import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { render } from '../../../../helper/render';
import {
  getByLabelText,
  getByRole,
  getByText,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Button;
let renderApp;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Button = (await import(cocoIdxStr)).Button;
      renderApp = (await import('coco-mvc')).renderApp;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('正常渲染一个组件', async () => {
    const { container } = render(ApplicationContext, renderApp, Button);
    const button = getByRole(container, 'button');
    expect(button).toBeTruthy();
    expect(getByText(button, 'count:1')).toBeTruthy();
    button.click();
    await waitFor(() => {
      expect(getByText(button, 'count:2')).toBeTruthy();
    });
  });
});
