import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
let throwError;
let Single;
let Prototype;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const {
        ApplicationContext,
        Single: _S,
        Prototype: _P,
      } = await import(cocoIdxStr);
      Single = _S;
      Prototype = _P;
      _ApplicationContext = ApplicationContext;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    jest.resetModules();
    throwError = false;
  });

  test('默认singleton模式', async () => {
    const context = new _ApplicationContext();
    const s1 = context.getBean('defaultValue');
    const s2 = context.getBean('defaultValue');
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
