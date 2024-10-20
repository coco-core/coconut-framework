import {build} from "@cocofw/cli";
import App from './src/view/App';
import {pkgPath, cocoIdxStr} from '../../../../helper/pkg-path';
import { render } from '../../../../helper/render';
import {getByLabelText, getByRole, getByText, queryByTestId, waitFor} from "@testing-library/dom";


let start;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const {start: _s} = await import(cocoIdxStr);
      start = _s;
    } catch (e) {
      throwError = true;
    }
  })

  afterEach(async () => {
    throwError = false;
  })

  test('正常渲染父子组件', async () => {
    start();
    const container = render(App)
    const header = getByRole(container, 'heading')
    const button = getByRole(header, 'button')
    expect(button).toBeTruthy();
    expect(getByText(button, 'count:1')).toBeTruthy();
    button.click();
    await waitFor(() => {
      expect(getByText(button, 'count:2')).toBeTruthy();
    })
  });
})
