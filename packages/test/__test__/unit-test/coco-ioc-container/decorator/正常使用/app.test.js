import {_test_helper, Component, Scope, Target} from 'coco-mvc'
import {build} from "@cocofw/cli";
import Button from './src/component/Button';
import {pkgPath, cocoIdxStr} from '../../../../helper/pkg-path'

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

  test('组件类的元数据正确', async () => {
    start();
    const asExpected = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Button,
      [
        {Metadata: Component},
        {Metadata: Scope, fieldValues: {value: Scope.Type.Singleton}},
      ]
    )
    expect(asExpected).toBe(true);
  });

  test('所有元数据的元数据配置都正确 ', async () => {
    start();
    const target = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Target,
      [{
        Metadata: Target, fieldValues: {value: [Target.Type.Class]}
      }]
    );
    expect(target).toEqual(true);
    const component = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Component,
      [{
        Metadata: Target, fieldValues: {value: [Target.Type.Class]}
      }]
    );
    expect(component).toEqual(true);
  });
})
