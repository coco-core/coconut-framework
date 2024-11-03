import { _test_helper, Component, Scope, Target } from 'coco-mvc';
import { build } from '@cocofw/cli';
import Application from './src/component/application.ts';
import Router from './src/component/router.ts';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

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

  test('可以获取@bean的组件', async () => {
    const context = new _ApplicationContext();
    // todo 如果执行Application，则不会走Application内部的@bean，后面可以先添加configuration，然后引入configuration对应的类就没有问题了
    context.getBean(Application);
    const router = context.getBean(Router);
    expect(router).toBeTruthy();
  });
});
