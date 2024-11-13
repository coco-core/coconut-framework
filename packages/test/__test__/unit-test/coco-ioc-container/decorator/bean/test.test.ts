import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
let throwError;
let Application;
let Router;
let Button;
let Theme;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { default: A } = await import('./src/component/application.ts');
      Application = A;
      const { default: R } = await import('./src/component/router.ts');
      Router = R;
      const { default: B } = await import('./src/component/button.ts');
      Button = B;
      const { default: T } = await import('./src/component/theme.ts');
      Theme = T;
      const { ApplicationContext } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
    } catch (e) {
      console.error(e);
      throwError = true;
    }
  });

  afterEach(async () => {
    jest.resetModules();
    throwError = false;
  });

  test('直接传入要注册的ioc组件', async () => {
    const context = new _ApplicationContext();
    // todo 12 如果执行Application，则不会走Application内部的@bean，后面可以先添加configuration，然后引入configuration对应的类就没有问题了
    context.getBean(Application);
    const router = context.getBean(Router);
    expect(router).toBeTruthy();
  });

  test('通过对象传入要注册的ioc组件，默认singleton模式', async () => {
    const context = new _ApplicationContext();
    // todo 12 如果执行Application，则不会走Application内部的@bean，后面可以先添加configuration，然后引入configuration对应的类就没有问题了
    context.getBean(Application);
    const t1 = context.getBean(Theme);
    const t2 = context.getBean(Theme);
    expect(t1 === t2).toBe(true);
  });

  test('通过对象传入要注册的ioc组件，可以设置prototype模式', async () => {
    const context = new _ApplicationContext();
    // todo 12 如果执行Application，则不会走Application内部的@bean，后面可以先添加configuration，然后引入configuration对应的类就没有问题了
    context.getBean(Application);
    const b1 = context.getBean(Button);
    const b2 = context.getBean(Button);
    expect(b1 === b2).toBe(false);
  });
});
