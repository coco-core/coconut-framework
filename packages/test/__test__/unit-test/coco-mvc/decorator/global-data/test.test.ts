import { _test_helper as cli_helper } from '@cocojs/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path.ts';
import { _test_helper } from 'coco-mvc';

let ApplicationContext;
let throwError;
let Button;
let Button1;
describe('view', () => {
  beforeEach(async () => {
    try {
      cli_helper.prepareBuild(pkgPath(__dirname));
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      Button = (await import('./src/view/button.tsx')).default;
      Button1 = (await import('./src/view/button1.tsx')).default;
    } catch (e) {
      throwError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    throwError = false;
  });

  test('可以获取到globalData，并且是同一引用', async () => {
    const context = new ApplicationContext();
    const btn = context.getComponent(Button);
    const btn1 = context.getComponent(Button1);
    expect(btn).not.toBe(btn1);
    expect(btn.login).toBe(btn1.login);
    expect(btn.login.token).toBe('mock token');
  });
});
