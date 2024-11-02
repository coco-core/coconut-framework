import { getBean } from 'coco-mvc';
import { build } from '@cocofw/cli';
import Space from './src/component/Space';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
describe('ioc-container', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const { ApplicationContext } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
  });

  afterEach(async () => {});

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
