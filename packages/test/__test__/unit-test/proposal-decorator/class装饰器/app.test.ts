import { _test_helper as cli_helper } from '@cocojs/cli';
import { pkgPath, cocoIdxStr, cocoIdxFolder } from '../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';
import { decoratorName as a } from './src/decorator/a';
import { decoratorName as b } from './src/decorator/b';
import Button from './src/component/Button';

let ApplicationContext;

describe('class装饰器', () => {
  beforeEach(async () => {
    // TEST.decorator.reset();
    cli_helper.prepareBuild(pkgPath(__dirname));
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
  });

  test('一个类的多个类装饰器执行顺序', async () => {
    const context = new ApplicationContext();
    context.getComponent(Button);
    const isExpected = _test_helper.iocContainer.expectInOrder([
      { type: 'exec', name: a },
      { type: 'exec', name: b },
      { type: 'apply', name: b },
      { type: 'apply', name: a },
    ]);
    expect(isExpected).toEqual(true);
  });
});
