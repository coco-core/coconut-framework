// 自定义组件基类
export class Component {
  render: () => VirtualDom;
}

// 虚拟dom
export interface VirtualDom {
  // 对应浏览器标签组件
  tag?: string,
  // 对应class类组件
  constructor?: typeof Component,
  // 组件实例
  instance?: Component,
  props: any,
}

// 构建一个虚拟dom对象，类似于react中createElement
export const createVirtualDom = (component: string | typeof Component, props: Record<string, any>): VirtualDom => {
  const tag = typeof component === "string" ? component : undefined;
  const constructor = typeof component === 'function' ? component : undefined;

  return {
    tag,
    constructor,
    props,
  }
}