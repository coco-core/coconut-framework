import { getClsAnnotation, Component, Scope, ScopeType } from 'coco-mvc'
import { build } from "@cocofw/cli";
import Button from './app1/src/component/Button'

let start;
let throwError;
describe('annotation', () => {
  beforeEach(async () => {
    try {
      build("packages/test/__test__/unit-test/pkg-ioc-container/annotation/app1");
      const {start: _s} = await import("./app1/src/.coco/index");
      start = _s;
    } catch (e) {
      throwError = true;
    }
  })

  afterEach(async () => {
    throwError = false;
  })

  test('可以获取到注解的配置', async () => {
    start();
    const component = getClsAnnotation(Button, Component);
    expect(component).toBeInstanceOf(Component);
    const scope = getClsAnnotation(Button, Scope);
    expect(scope).toBeInstanceOf(Scope);
    expect(scope.value).toBe(ScopeType.Singleton);
  });
})
