// 自定义组件
export class Component {
  render: () => VDom;
}
export type DecorComponent = typeof Component;

// 虚拟dom
export interface VDom {
  $$typeof: string;
  // jsx中组件的tag，按type的不同可能是浏览器标签或自定义组件类
  type: string | DecorComponent;
  // 宿主组件对应html元素
  elm?: HTMLElement;
  // 如果的浏览器标签，则是elm.parent
  parentElm: HTMLElement;
  // 自定义组件实例
  instance?: Component;
  props: {
    children?: VDom[];
    onClick?: Function;
    innerText?: string;
    [key: string]: any;
  };
}