import * as iocContainerTestHelper from 'coco-ioc-container-test-helper';
import { type ApplicationContext } from 'coco-ioc-container';
import { type Render } from '../decorator/render.ts';

let ctx: ApplicationContext;
let container: HTMLDivElement;
let renderIns: any;

/**
 *
 * @param ApplicationContext
 * @param ViewComponent
 * @param RenderCls
 * @param HistoryRouterCls
 * @param scene 2种测试场景，一种是使用router(通过路由机制动态渲染组件)，一种是不使用router(直接渲染传入的组件或者是不渲染)
 */
function doStart(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  RenderCls: Class<any>,
  HistoryRouterCls: Class<any>,
  scene: 'use-router' | 'no-router'
) {
  if (!ctx) {
    // 初次渲染
    ctx = new ApplicationContext();
    renderIns = ctx.getBean<Render>(RenderCls);
    container = document.createElement('div');
    renderIns.setContainer(container);
    const router = ctx.getBean(HistoryRouterCls);
    // todo 如何自动装配，还要解决依赖问题
    router.setRender(renderIns);
  }
  if (scene === 'no-router' && ViewComponent) {
    renderIns.render(ViewComponent);
  }
  return { ctx, container };
}

function render(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  Render: Class<any>,
  HistoryRouter: Class<any>
) {
  return doStart(
    ApplicationContext,
    ViewComponent,
    Render,
    HistoryRouter,
    'no-router'
  );
}

function start(
  ApplicationContext: Class<ApplicationContext>,
  Render: Class<any>,
  HistoryRouter: Class<any>
) {
  return doStart(
    ApplicationContext,
    undefined,
    Render,
    HistoryRouter,
    'use-router'
  );
}

function cleanRender() {
  ctx = undefined;
  container = undefined;
  renderIns = undefined;
}
const _test_helper = {
  iocContainer: iocContainerTestHelper,
  mvc: { render, start, cleanRender },
};
if (!__TEST__) {
  _test_helper.iocContainer = {} as any;
  _test_helper.mvc = {} as any;
}

export { _test_helper };
