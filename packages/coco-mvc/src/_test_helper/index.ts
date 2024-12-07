import { jsx } from '../jsx-runtime';
import { type ApplicationContext } from 'coco-ioc-container';

let ctx: ApplicationContext;
let container: HTMLDivElement;
let webRender: any;

export function render(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  WebRender: Class<any>,
  HistoryRouter: Class<any>
) {
  return doStart(
    ApplicationContext,
    ViewComponent,
    WebRender,
    HistoryRouter,
    'no-router'
  );
}

export function start(
  ApplicationContext: Class<ApplicationContext>,
  WebRender: Class<any>,
  HistoryRouter: Class<any>
) {
  return doStart(
    ApplicationContext,
    undefined,
    WebRender,
    HistoryRouter,
    'use-router'
  );
}

/**
 *
 * @param ApplicationContext
 * @param ViewComponent
 * @param WebRender
 * @param HistoryRouter
 * @param scene 2种测试场景，一种是使用router(通过路由机制动态渲染组件)，一种是不使用router(直接渲染传入的组件或者是不渲染)
 */
function doStart(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  WebRender: Class<any>,
  HistoryRouter: Class<any>,
  scene: 'use-router' | 'no-router'
) {
  if (!ctx) {
    // 初次渲染
    ctx = new ApplicationContext();
    webRender = ctx.getBean(WebRender);
    container = document.createElement('div');
    webRender.setContainer(container);
    const router = ctx.getBean(HistoryRouter);
    router.setRender(webRender);
  }
  if (scene === 'no-router' && ViewComponent) {
    webRender.render(ViewComponent);
  }
  return { ctx, container };
}

export function cleanRender() {
  ctx = undefined;
  container = undefined;
  webRender = undefined;
}
