import {build} from "@cocofw/cli";
import {pkgPath, cocoIdxStr} from '../../../../helper/pkg-path'
import {get, reset} from "./src/result";

let start;

describe('annotation', () => {
  beforeEach(async () => {
    reset();
    build(pkgPath(__dirname));
    const {start: _s} = await import(cocoIdxStr);
    start = _s;
  })

  afterEach(async () => {
  })

  test('多个类装饰器执行顺序', async () => {
    start();
    const order = get();
    const array = ['arraya1', 'arrayb1', 'arrayb2', 'arraya2'];
    const button = ['buttona1', 'buttonb1', 'buttonb2', 'buttona2'];
    const space = ['spacec1', 'spacec2'];
    expect(order).toEqual(array.concat(...[button], ...[space]))
  });
})
