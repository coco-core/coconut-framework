// 自定义组件基类
export class Component {
  render: () => VDom;
}

export enum VDomType {
  Host, // 浏览器标签
  Component, // 自定义类组件
}
// 虚拟dom
// 通用属性
interface VDomBase {
  type: VDomType;
  elm?: HTMLElement;
  props: { children?: VDom[], onClick?: Function, innerText?: string, [key: string]: any };
}
// 浏览器标签
interface VDomHost {
  tag?: string;
}
// class类组件
interface VDomComponent {
  cons?: typeof Component;
  // 组件实例
  instance?: Component;
}
export interface VDom extends VDomBase, VDomHost, VDomComponent {}


// 构建一个虚拟dom对象，类似于react中createElement
export const createVirtualDom = (component: string | typeof Component, props: Record<string, any>): VDom => {
  const tag = typeof component === "string" ? component : undefined;
  const constructor = typeof component === 'function' ? component : undefined;

  return {
    type: tag ? VDomType.Host : VDomType.Component,
    tag,
    cons: constructor,
    props,
  }
}