import { _test_helper, Component, Target } from 'coco-mvc';
import { genDotCoco } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let ApplicationContext;
let Button;
let throwError;
describe('decorator', () => {
  beforeEach(async () => {
    try {
      genDotCoco(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Button = (await import(cocoIdxStr)).Button;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
  });

  test('组件类的元数据正确', async () => {
    const context = new ApplicationContext();
    const asExpected = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Button,
      [
        {
          Metadata: Component,
          fieldValues: { scope: Component.Scope.Singleton },
        },
      ]
    );
    expect(asExpected).toBe(true);
    const target = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Target,
      [
        {
          Metadata: Target,
          fieldValues: { value: [Target.Type.Class] },
        },
      ]
    );
    expect(target).toEqual(true);
    const component = _test_helper.iocContainer.checkClassMetadataAsExpected(
      Component,
      [
        {
          Metadata: Target,
          fieldValues: { value: [Target.Type.Class] },
        },
      ]
    );
    expect(component).toEqual(true);
  });
});
