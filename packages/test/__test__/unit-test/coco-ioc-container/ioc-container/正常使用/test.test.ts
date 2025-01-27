import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let Button;
let Single;
let VanButton;
describe('ioc-container', () => {
  beforeEach(async () => {
    genDotCoco(pkgPath(__dirname));
    Single = (await import(cocoIdxStr)).Single;
    Button = (await import(cocoIdxStr)).Button;
    VanButton = (await import(cocoIdxStr)).VanButton;
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
  });

  test('通过cls可以拿到实例', async () => {
    const context = new ApplicationContext();
    const bean = context.getBean(Button);
    expect(bean).toBeInstanceOf(Button);
  });

  test('component装饰器设置prototype每次返回不同的实例', async () => {
    const context = new ApplicationContext();
    const bean1 = context.getBean(Button);
    const bean2 = context.getBean(Button);
    expect(bean1).toBeInstanceOf(Button);
    expect(bean2).toBeInstanceOf(Button);
    expect(bean1).not.toBe(bean2);
  });

  test('单例模式每次获取到的都是一样的', async () => {
    const context = new ApplicationContext();
    const bean1 = context.getBean(Single);
    const bean2 = context.getBean(Single);
    expect(bean1).toBeInstanceOf(Single);
    expect(bean2).toBeInstanceOf(Single);
    expect(bean1).toBe(bean2);
  });
});
