import { _test_helper, Component, Scope, Target } from 'coco-mvc';
import { build } from '@cocofw/cli';
import DefaultValue from './src/component/default-value.ts';
import Single from './src/component/single.ts';
import Prototype from './src/component/prototype.ts';
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

  test('默认singleton模式', async () => {
    const context = new _ApplicationContext();
    const s1 = context.getBean(DefaultValue);
    const s2 = context.getBean(DefaultValue);
    expect(s1 === s2).toBe(true);
  });

  test('支持显式singleton', async () => {
    const context = new _ApplicationContext();
    const s1 = context.getBean(Single);
    const s2 = context.getBean(Single);
    expect(s1 === s2).toBe(true);
  });

  test('支持设置prototype', async () => {
    const context = new _ApplicationContext();
    const p1 = context.getBean(Prototype);
    const p2 = context.getBean(Prototype);
    expect(p1 === p2).toBe(false);
  });
});
