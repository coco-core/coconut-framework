import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
let Application;
describe('decorator', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const { ApplicationContext, Application: _A } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
    Application = _A;
  });

  afterEach(async () => {
    jest.resetModules();
  });

  test('可以获取@bean的组件', async () => {
    let throwError = false;
    try {
      const context = new _ApplicationContext();
      context.getBean(Application);
      context.getBean(Application);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBe(false);
  });
});
