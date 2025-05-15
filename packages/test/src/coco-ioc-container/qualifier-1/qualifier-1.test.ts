import { _test_helper as cli_helper } from '@cocojs/cli';
import { _test_helper } from 'coco-mvc';
import {
  pkgPath,
  cocoIdxStr,
  cocoIdxAppJson,
} from '../../_helper_/pkg-path.ts';

let ApplicationContext;
let ApplicationJson;
let buildError;
let Child;
let User;
describe('qualifier-1', () => {
  beforeEach(async () => {
    try {
      cli_helper.prepareBuild(pkgPath(__dirname));
      Child = (await import('./src/component/child.ts')).default;
      User = (await import('./src/view/user.tsx')).default;
      ApplicationContext = (await import(cocoIdxStr)).ApplicationContext;
      ApplicationJson = (await import(cocoIdxAppJson)).default;
    } catch (e) {
      console.error(e);
      buildError = true;
    }
  });

  afterEach(async () => {
    _test_helper.iocContainer.clear();
    jest.resetModules();
    buildError = false;
  });

  test('@autowired注入的组件存在多个子组件，使用动态配置指定一个子组件', async () => {
    const context = new ApplicationContext(ApplicationJson);
    const user = context.getComponent(User);
    expect(user.parent instanceof Child).toBe(true);
  });
});
