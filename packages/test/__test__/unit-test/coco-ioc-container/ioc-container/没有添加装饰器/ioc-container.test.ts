import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
let Space;
describe('ioc-container', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const { default: _Space } = await import('./src/component/Space.ts');
    Space = _Space;
    const { ApplicationContext } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
  });

  afterEach(async () => {
    jest.resetModules();
  });

  test('没有添加注解，则不能获取组件实例', async () => {
    let throwError = false;
    try {
      const context = new _ApplicationContext();
      context.getBean(Space);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBe(true);
  });
});
