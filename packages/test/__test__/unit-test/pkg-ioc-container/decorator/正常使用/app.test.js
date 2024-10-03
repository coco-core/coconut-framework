import {_test_helper, Component, Scope, ScopeType, Target, TargetType} from 'coco-mvc'
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
        {Metadata: Scope, fieldValues: {value: ScopeType.Singleton}},
      ]
    )
    expect(asExpected).toBe(true);
  });

  test('所有元数据的元数据配置都正确 ', async () => {
    start();
    const same = _test_helper.iocContainer.checkMetadataForMetadataAsExpected([
      {
        metadataCls: Target,
        metaList: [{Metadata: Target, fieldValues: {value: [TargetType.Class]}}]
      },
      {
        metadataCls: Component,
        metaList: [{Metadata: Target, fieldValues: {value: [TargetType.Class]}}]
      },
      {
        metadataCls: Scope,
        metaList: [{Metadata: Target, fieldValues: {value: [TargetType.Class]}}]
      }
    ]);
    expect(same).toEqual(true);
  });
})
