// 自定义组件基类
export class Component {
  render: () => VDom;
}
export type DecorComponent = typeof Component;

export enum VDomType {
  Host = 'h', // 浏览器标签
  Component = 'c', // 自定义类组件
}
// 虚拟dom
// 通用属性
interface VDomBase {
  // jsx中组件的tag，按type的不同可能是浏览器标签或自定义组件类
  type: string | DecorComponent;
  elm?: HTMLElement;
  props: {
    children?: VDom[];
    onClick?: Function;
    innerText?: string;
    [key: string]: any;
  };
}
// VDomType.Host
interface VDomHost {}
// VDomType.Component
interface VDomComponent {
  // 组件实例
  instance?: Component;
}
export interface VDom extends VDomBase, VDomHost, VDomComponent {}