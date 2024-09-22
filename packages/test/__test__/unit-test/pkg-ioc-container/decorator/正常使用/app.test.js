import { getClsAnnotation, Component, Scope, ScopeType } from 'coco-mvc'
import { build } from "@cocofw/cli";
import Button from './src/component/Button';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path'

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

  test('可以获取到注解的配置', async () => {
    start();
    const component = getClsAnnotation(Button, Component);
    expect(component).toBeInstanceOf(Component);
    const scope = getClsAnnotation(Button, Scope);
    expect(scope).toBeInstanceOf(Scope);
    expect(scope.value).toBe(ScopeType.Singleton);
  });
})
