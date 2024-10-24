import {getBean} from "coco-mvc";
import { build } from "@cocofw/cli";
import Space from "./src/component/Space";
import {pkgPath, cocoIdxStr} from "../../../../helper/pkg-path";

let start;
describe('ioc-container', () => {

  beforeEach(async () => {
    build(pkgPath(__dirname));
    const {start: _s} = await import(cocoIdxStr);
    start = _s;
  })

  afterEach(async () => {
  })

  test('没有添加注解，则不能获取组件实例', async () => {
    let throwError = false;
    try {
      start();
      getBean(Space);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBe(true);
  })
})
