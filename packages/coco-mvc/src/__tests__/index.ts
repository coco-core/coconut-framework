export * from '../index';
import * as iocContainerTestHelper from 'coco-ioc-container-test-helper';
import { type ApplicationContext } from 'coco-ioc-container';
import TestWebRender from './test-web-render.ts';

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
 * @param applicationJson
 */
function doStart(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  RenderCls: Class<any>,
  HistoryRouterCls: Class<any>,
  scene: 'use-router' | 'no-router',
  applicationJson?: Record<string, any>
) {
  if (!ctx) {
    // 初次渲染
    ctx = new ApplicationContext(applicationJson);
    renderIns = ctx.getComponent(RenderCls);
  }
  if (scene === 'no-router' && ViewComponent) {
    renderIns.render(ViewComponent);
  }
  return { ctx, container: renderIns.container };
}

function render(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  Render: Class<any>,
  HistoryRouter: Class<any>,
  applicationJson: Record<string, any>
) {
  return doStart(
    ApplicationContext,
    ViewComponent,
    Render,
    HistoryRouter,
    'no-router',
    applicationJson
  );
}

function start(
  ApplicationContext: Class<ApplicationContext>,
  Render: Class<any>,
  HistoryRouter: Class<any>,
  applicationJson: Record<string, any>
) {
  return doStart(
    ApplicationContext,
    undefined,
    Render,
    HistoryRouter,
    'use-router',
    applicationJson
  );
}

function cleanRender() {
  ctx = undefined;
  container = undefined;
  renderIns = undefined;
}
const _test_helper = {
  iocContainer: iocContainerTestHelper,
  mvc: { render, start, cleanRender, TestWebRender },
};

export { _test_helper };
