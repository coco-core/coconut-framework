import {getBean} from "coco-mvc";
import { build } from "@cocofw/cli";
import Button from "./src/component/Button";
import Single from "./src/component/Single";
import VanButton from "./src/component/VanButton";
import {pkgPath, cocoIdxStr} from "../../../../helper/pkg-path";

let start;
describe('ioc-container', () => {

  beforeEach(async () => {
    build(pkgPath(__dirname));
    const {start: _s} = await import(cocoIdxStr);
    start = _s;
  })

  test('通过cls可以拿到实例', async () => {
    start();
    const bean = getBean(Button);
    expect(bean).toBeInstanceOf(Button);
  });

  test('通过name可以拿到实例', async () => {
    start();
    const bean = getBean('button');
    expect(bean).toBeInstanceOf(Button);
  });

  test('通过自定义name可以拿到实例', async () => {
    start();
    const bean = getBean('antButton');
    expect(bean).toBeInstanceOf(VanButton);
  });

  test('每次返回的组件都是不同的实例', async () => {
    start();
    const bean1 = getBean(Button);
    const bean2 = getBean(Button);
    expect(bean1).toBeInstanceOf(Button);
    expect(bean2).toBeInstanceOf(Button);
    expect(bean1).not.toBe(bean2);
  });

  test('每次返回的组件都是不同的实例-2', async () => {
    start();
    const bean1 = getBean(Button);
    const bean2 = getBean('button');
    expect(bean1).toBeInstanceOf(Button);
    expect(bean2).toBeInstanceOf(Button);
    expect(bean1).not.toBe(bean2);
  });

  test('单例模式每次获取到的都是一样的', async () => {
    start();
    const bean1 = getBean(Single);
    const bean2 = getBean(Single);
    expect(bean1).toBeInstanceOf(Single);
    expect(bean2).toBeInstanceOf(Single);
    expect(bean1).toBe(bean2);
  })

  test('单例模式每次获取到的都是一样的-2', async () => {
    start();
    const bean1 = getBean(Single);
    const bean2 = getBean('single');
    expect(bean1).toBeInstanceOf(Single);
    expect(bean2).toBeInstanceOf(Single);
    expect(bean1).toBe(bean2);
  })
})
