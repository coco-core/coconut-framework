import {_test_helper, Component, Scope, ScopeType} from 'coco-mvc'
import {build} from "@cocofw/cli";
import Button from './src/component/Button';
import {pkgPath, cocoIdxStr} from '../../../../helper/pkg-path'

let start;
describe('decorator', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    const {start: _s} = await import(cocoIdxStr);
    start = _s;
  })

  test('被装饰器装饰的类在内部都保存了响应的元数据', async () => {
    start();
    const asExpected = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Button,
      [
        {Metadata: Component},
        {Metadata: Scope, fieldValues: {value: ScopeType.Singleton}},
      ]
    )
    expect(asExpected).toEqual(true);
  });
})
