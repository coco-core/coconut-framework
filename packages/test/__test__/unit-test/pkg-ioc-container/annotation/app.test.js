import { build } from "@cocofw/cli";

let start;
let throwError;
describe('annotation', () => {
  beforeEach(async () => {
    try {
      build("packages/test/__test__/unit-test/pkg-ioc-container/annotation/app");
      const {start: _s} = await import("./app/src/.coco/index");
      start = _s;
    } catch (e) {
      throwError = true;
    }
  })

  afterEach(async () => {
    throwError = false;
  })

  test('component作用到field上会报错', async () => {
    expect(throwError).toBe(true);
  });
})
