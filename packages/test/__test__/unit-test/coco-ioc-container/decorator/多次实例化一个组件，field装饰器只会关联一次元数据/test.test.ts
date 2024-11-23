import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

let ApplicationContext;
let UserInfo;
describe('decorator', () => {
  beforeEach(async () => {
    build(pkgPath(__dirname));
    ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
    UserInfo = (await import(cocoIdxStr)).UserInfo;
  });

  afterEach(async () => {
    jest.resetModules();
  });

  test('可以获取@bean的组件', async () => {
    let throwError = false;
    try {
      const context = new ApplicationContext();
      context.getBean(UserInfo);
      context.getBean(UserInfo);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBe(false);
  });
});
