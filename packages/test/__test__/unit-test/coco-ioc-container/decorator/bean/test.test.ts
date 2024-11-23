import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Router;
let Button;
let Theme;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      Router = (await import('./src/component/router.ts')).default;
      Button = (await import('./src/component/button.ts')).default;
      Theme = (await import('./src/component/theme.ts')).default;
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    } catch (e) {
      console.error(e);
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('直接传入要注册的ioc组件', async () => {
    const context = new ApplicationContext();
    const router = context.getBean(Router);
    expect(router).toBeTruthy();
  });

  test('通过对象传入要注册的ioc组件，默认singleton模式', async () => {
    const context = new ApplicationContext();
    const t1 = context.getBean(Theme);
    const t2 = context.getBean(Theme);
    expect(t1 === t2).toBe(true);
  });

  test('通过对象传入要注册的ioc组件，可以设置prototype模式', async () => {
    const context = new ApplicationContext();
    const b1 = context.getBean(Button);
    const b2 = context.getBean(Button);
    expect(b1 === b2).toBe(false);
  });
});
