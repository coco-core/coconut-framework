import { _test_helper, Component, Scope, Target } from 'coco-mvc';
import { build } from '@cocofw/cli';
import Application from './src/component/application.ts';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import Router from './src/component/router.ts';
import Button from './src/component/button.ts';
import Theme from './src/component/theme.ts';

let _ApplicationContext;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
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
