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
  if (!ctx) {
    // 初次渲染
    ctx = new ApplicationContext();
    webRender = ctx.getBean(WebRender);
    container = document.createElement('div');
    webRender.setContainer(container);
    const router = ctx.getBean(HistoryRouter);
    router.setRender(render);
  }
  webRender.render(jsx(ViewComponent, undefined));
  return { ctx, container };
}

export function cleanRender() {
  ctx = undefined;
  container = undefined;
  webRender = undefined;
}
