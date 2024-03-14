import {VDom} from "../component";
import {initRender} from "../reconciler";

export interface Container {
  elm: HTMLElement,
  render: (vd: VDom) => void,
  // 当前页面对应的vdom
  vdom?: VDom,
}

export const createContainer = (elm: HTMLElement): Container => {
  const container: Container = {
    elm,
    render: (vd: VDom) => {
      initRender(container, vd)
    }
  };

  return container;
}