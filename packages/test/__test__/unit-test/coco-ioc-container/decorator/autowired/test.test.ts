import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
let throwError;
let Router;
let Route;
let Button;
let Theme;
let UserInfo;
describe('autowired', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { default: R } = await import('./src/component/router.ts');
      Router = R;
      const { default: R2 } = await import('./src/component/route.ts');
      Route = R2;
      const { default: T } = await import('./src/component/theme.ts');
      Theme = T;
      const { default: U } = await import('./src/view/user-info.tsx');
      UserInfo = U;
      const { default: B } = await import('./src/view/button.tsx');
      Button = B;
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

  test('可以拿到注册的view组件，且拿到的实例也是不同的', async () => {
    const context = new _ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.button instanceof Button).toBe(true);
    expect(userInfo2.button instanceof Button).toBe(true);
    expect(userInfo1.button).not.toBe(userInfo2.button);
  });

  test('可以拿到注册的view组件，且可以拿到单例组件', async () => {
    const context = new _ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.theme instanceof Theme).toBe(true);
    expect(userInfo1.theme).toBe(userInfo2.theme);
  });

  test('可以拿到@bean注册的组件，默认是单例组件', async () => {
    const context = new _ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.router instanceof Router).toBe(true);
    expect(userInfo1.router).toBe(userInfo2.router);
  });

  test('可以拿到@bean注册的组件，也支持每次返回新的实例', async () => {
    const context = new _ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.route instanceof Route).toBe(true);
    expect(userInfo2.route instanceof Route).toBe(true);
    expect(userInfo1.route).not.toBe(userInfo2.route);
  });
});
