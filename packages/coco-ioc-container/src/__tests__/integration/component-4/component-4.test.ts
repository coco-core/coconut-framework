import { _test_helper as cli_helper } from '@cocojs/cli';
import { _test_helper } from 'coco-mvc';
const { pkgPath, cocoIdxStr } = _test_helper.iocContainer.pkgPath;

let ApplicationContext;
let throwError;
describe('不能同时添加一个component装饰器和一个component的复合装饰器的复合装饰器', () => {
  beforeEach(async () => {
    try {
      cli_helper.prepareBuild(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('不能同时添加一个component的复合装饰器和一个component的复合装饰器的复合装饰器', async () => {
    expect(throwError).toBe(true);
  });
});
