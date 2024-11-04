import { build } from '@cocofw/cli';
import Application from './src/component/application.ts';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
describe('decorator', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const { ApplicationContext } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
  });

  afterEach(async () => {});

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
