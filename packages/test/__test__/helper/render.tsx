import { type ApplicationContext } from 'coco-mvc';

export function render(
  ApplicationContext: ApplicationContext,
  renderApp: any,
  ViewComponent: any
) {
  new ApplicationContext();
  const container = document.createElement('div');
  renderApp(<ViewComponent />, container);
  return container;
}
