import { build } from '@cocofw/cli';
import { pkgPath, cocoIdxStr } from '../../../../helper/pkg-path';

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
  });

  afterEach(async () => {
    throwError = false;
  });

  // todo 对target的校验
  xtest('component作用到field上会报错', async () => {
    expect(throwError).toBe(true);
  });
});
