import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Single;
let Prototype;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      Single = (await import(cocoIdxStr)).Single;
      Prototype = (await import(cocoIdxStr)).Prototype;
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('默认singleton模式', async () => {
    const context = new ApplicationContext();
    const s1 = context.getBean('defaultValue');
    const s2 = context.getBean('defaultValue');
    expect(s1 === s2).toBe(true);
  });

  test('支持显式singleton', async () => {
    const context = new ApplicationContext();
    const s1 = context.getBean(Single);
    const s2 = context.getBean(Single);
    expect(s1 === s2).toBe(true);
  });

  test('支持设置prototype', async () => {
    const context = new ApplicationContext();
    const p1 = context.getBean(Prototype);
    const p2 = context.getBean(Prototype);
    expect(p1 === p2).toBe(false);
  });
});
