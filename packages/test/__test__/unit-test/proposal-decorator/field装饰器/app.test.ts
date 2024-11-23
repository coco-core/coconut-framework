import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr, cocoIdxFolder } from '../../../helper/pkg-path';
import { _test_helper } from 'coco-mvc';
import { decoratorName as a } from './src/decorator/a';
import { decoratorName as b } from './src/decorator/b';
import Button from './src/component/Button';

let ApplicationContext;

describe('field装饰器', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
  });

  test('多个装饰器执行顺序', async () => {
    const context = new ApplicationContext();
    context.getBean(Button);
    const isExpected = _test_helper.iocContainer.expectInOrder([
      { type: 'exec', name: a },
      { type: 'exec', name: b },
      { type: 'apply', name: b },
      { type: 'apply', name: a },
    ]);
    expect(isExpected).toEqual(true);
  });
});
