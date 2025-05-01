import { _test_helper as cli_helper } from '@cocojs/cli';
import { _test_helper } from 'coco-mvc';
const { pkgPath, cocoIdxStr } = _test_helper.iocContainer.pkgPath;

export const mockFn = jest.fn();

let ApplicationContext;
let Button;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    cli_helper.prepareBuild(pkgPath(__dirname));
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    Button = (await import('./src/component/a-button.ts')).default;
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('类的postConstruct调用是从下往上的', async () => {
    const ctx = new ApplicationContext();
    ctx.getComponent(Button);
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn.mock.calls[0][0]).toBe('b');
    expect(mockFn.mock.calls[1][0]).toBe('a');
  });
});
