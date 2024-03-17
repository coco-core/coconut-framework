// 自定义组件基类
export class Component {
  render: () => VDom;
}
export type DecorComponent = typeof Component;

export enum VDomType {
  Host, // 浏览器标签
  Component, // 自定义类组件
}
// 虚拟dom
// 通用属性
interface VDomBase {
  type: VDomType;
  // jsx中组件的tag，按type的不同可能是浏览器标签或自定义组件类
  tag: string | DecorComponent;
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

// 构建一个虚拟dom对象，类似于react中createElement
export const createVirtualDom = (
  component: string | DecorComponent,
  props: Record<string, any>,
): VDom => {
  return {
    type: typeof component === 'string' ? VDomType.Host : VDomType.Component,
    tag: component,
    props,
  };
};
