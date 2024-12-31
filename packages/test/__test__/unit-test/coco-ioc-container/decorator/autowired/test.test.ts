import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Router;
let Route;
let Button;
let Theme;
let UserInfo;
describe('autowired', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      Router = (await import('./src/component/router.ts')).default;
      Route = (await import('./src/component/route.ts')).default;
      Theme = (await import('./src/component/theme.ts')).default;
      UserInfo = (await import('./src/view/user-info.tsx')).default;
      Button = (await import('./src/view/button.tsx')).default;
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

  test('可以拿到注册的view组件，且拿到的实例也是不同的', async () => {
    const context = new ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.button instanceof Button).toBe(true);
    expect(userInfo2.button instanceof Button).toBe(true);
    expect(userInfo1.button).not.toBe(userInfo2.button);
  });

  test('可以拿到注册的view组件，且可以拿到单例组件', async () => {
    const context = new ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.theme instanceof Theme).toBe(true);
    expect(userInfo1.theme).toBe(userInfo2.theme);
  });

  test('可以拿到@bean注册的组件，默认是单例组件', async () => {
    const context = new ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.router instanceof Router).toBe(true);
    expect(userInfo1.router).toBe(userInfo2.router);
  });

  test('可以拿到@bean注册的组件，也支持每次返回新的实例', async () => {
    const context = new ApplicationContext();
    const userInfo1 = context.getBean(UserInfo);
    const userInfo2 = context.getBean(UserInfo);
    expect(userInfo1.route instanceof Route).toBe(true);
    expect(userInfo2.route instanceof Route).toBe(true);
    expect(userInfo1.route).not.toBe(userInfo2.route);
  });
});
