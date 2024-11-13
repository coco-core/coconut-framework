import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

export const mockFn = jest.fn();

let _ApplicationContext;
let Button;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext, Button: B } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
      Button = B;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    throwError = false;
  });

  test('类的postConstruct调用是从下往上的', async () => {
    const ctx = new _ApplicationContext();
    ctx.getBean(Button);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn.mock.calls[0][0]).toBe('b');
    expect(mockFn.mock.calls[1][0]).toBe('a');
  });
});
