import { type ApplicationContext } from 'coco-mvc';

export function render(
  ApplicationContext: ApplicationContext,
  renderApp: any,
  ViewComponent: any
) {
  const container = document.createElement('div');
  const ctx = new ApplicationContext();
  renderApp(<ViewComponent />, container);
  return { container, ctx };
}

export function renderWithContainer(
  container: any,
  renderApp: any,
  ViewComponent: any
) {
  renderApp(<ViewComponent />, container);
}
