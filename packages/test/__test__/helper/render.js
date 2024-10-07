import {renderApp} from 'coco-mvc'

export function render(ViewComponent) {
  const container = document.createElement('div')
  renderApp(<ViewComponent />, container)
  return container
}