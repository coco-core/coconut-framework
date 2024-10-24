import { build } from "@cocofw/cli";
import {pkgPath, cocoIdxStr} from "../../../../helper/pkg-path";

let start;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const {start: _s} = await import(cocoIdxStr);
      start = _s;
    } catch (e) {
      throwError = true;
    }
  })

  afterEach(async () => {
    throwError = false;
  })

  // todo 对target的校验
  xtest('component作用到field上会报错', async () => {
    expect(throwError).toBe(true);
  });
})
