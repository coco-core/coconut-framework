import {build} from "@cocofw/cli";
import Button from './src/view/Button';
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

  test('正常渲染一个组件', async () => {
    start();
    const container = render(Button)
    expect(getByRole(container, 'button')).toBeTruthy();
  });
})
