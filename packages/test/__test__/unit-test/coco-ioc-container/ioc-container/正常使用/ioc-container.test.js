import { build } from '@cocofw/cli';
import Button from './src/component/Button';
import Single from './src/component/Single';
import VanButton from './src/component/VanButton';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let _ApplicationContext;
describe('ioc-container', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const { ApplicationContext } = await import(cocoIdxStr);
    _ApplicationContext = ApplicationContext;
  });

  test('通过cls可以拿到实例', async () => {
    const context = new _ApplicationContext();
    const bean = context.getBean(Button);
    expect(bean).toBeInstanceOf(Button);
  });

  test('通过name可以拿到实例', async () => {
    const context = new _ApplicationContext();
    const bean = context.getBean('button');
    expect(bean).toBeInstanceOf(Button);
  });

  test('通过自定义name可以拿到实例', async () => {
    const context = new _ApplicationContext();
    const bean = context.getBean('antButton');
    expect(bean).toBeInstanceOf(VanButton);
  });

  test('每次返回的组件都是不同的实例', async () => {
    const context = new _ApplicationContext();
    const bean1 = context.getBean(Button);
    const bean2 = context.getBean(Button);
    expect(bean1).toBeInstanceOf(Button);
    expect(bean2).toBeInstanceOf(Button);
    expect(bean1).not.toBe(bean2);
  });

  test('每次返回的组件都是不同的实例-2', async () => {
    const context = new _ApplicationContext();
    const bean1 = context.getBean(Button);
    const bean2 = context.getBean('button');
    expect(bean1).toBeInstanceOf(Button);
    expect(bean2).toBeInstanceOf(Button);
    expect(bean1).not.toBe(bean2);
  });

  test('单例模式每次获取到的都是一样的', async () => {
    const context = new _ApplicationContext();
    const bean1 = context.getBean(Single);
    const bean2 = context.getBean(Single);
    expect(bean1).toBeInstanceOf(Single);
    expect(bean2).toBeInstanceOf(Single);
    expect(bean1).toBe(bean2);
  });

  test('单例模式每次获取到的都是一样的-2', async () => {
    const context = new _ApplicationContext();
    const bean1 = context.getBean(Single);
    const bean2 = context.getBean('single');
    expect(bean1).toBeInstanceOf(Single);
    expect(bean2).toBeInstanceOf(Single);
    expect(bean1).toBe(bean2);
  });
});
