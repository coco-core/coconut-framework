import { jsx } from '../jsx-runtime';
import { type ApplicationContext } from 'coco-ioc-container';

let ctx: ApplicationContext;
let container: HTMLDivElement;
let renderIns: any;

export function render(
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

export function start(
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

/**
 *
 * @param ApplicationContext
 * @param ViewComponent
 * @param Render
 * @param HistoryRouter
 * @param scene 2种测试场景，一种是使用router(通过路由机制动态渲染组件)，一种是不使用router(直接渲染传入的组件或者是不渲染)
 */
function doStart(
  ApplicationContext: Class<ApplicationContext>,
  ViewComponent: any,
  Render: Class<any>,
  HistoryRouter: Class<any>,
  scene: 'use-router' | 'no-router'
) {
  if (!ctx) {
    // 初次渲染
    ctx = new ApplicationContext();
    renderIns = ctx.getBean(Render);
    container = document.createElement('div');
    renderIns.setContainer(container);
    const router = ctx.getBean(HistoryRouter);
    router.setRender(renderIns);
  }
  if (scene === 'no-router' && ViewComponent) {
    renderIns.render(ViewComponent);
  }
  return { ctx, container };
}

export function cleanRender() {
  ctx = undefined;
  container = undefined;
  renderIns = undefined;
}
