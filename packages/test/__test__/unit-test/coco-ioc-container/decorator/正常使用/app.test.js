import {_test_helper, Component, Scope, Target} from 'coco-mvc'
import {build} from "@cocofw/cli";
import Button from './src/component/Button';
import {pkgPath, cocoIdxStr} from '../../../../helper/pkg-path'

let _ApplicationContext;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      build(pkgPath(__dirname));
      const { ApplicationContext } = await import(cocoIdxStr);
      _ApplicationContext = ApplicationContext;
    } catch (e) {
      throwError = true;
    }
  })

  afterEach(async () => {
    throwError = false;
  })

  test('组件类的元数据正确', async () => {
    const context = new _ApplicationContext();
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
    const context = new _ApplicationContext();
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
