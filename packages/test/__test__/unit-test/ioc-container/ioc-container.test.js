import {getBean, forceClear_4test} from "coco-mvc";
import { build } from "@cocofw/cli";
import Button from "./app/src/component/Button";
import Space from "./app/src/component/Space";
import Single from "./app/src/component/Single";

let start;
describe('ioc-container', () => {

  beforeEach(async () => {
    build("packages/test/__test__/unit-test/ioc-container/app");
    const {start: _s} = await import("./app/src/.coco/index");
    start = _s;
  })

  test('通过cls可以拿到实例', async () => {
    start();
    const bean = getBean(Button);
    expect(bean).toBeInstanceOf(Button);
  });

  test('没有添加注解，则不能获取组件实例', async () => {
    start();
    const bean = getBean(Space);
    expect(bean).toBeNull();
  })

  test('每次返回的组件都是不同的实例', async () => {
    start();
    const bean1 = getBean(Button);
    const bean2 = getBean(Button);
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
})
