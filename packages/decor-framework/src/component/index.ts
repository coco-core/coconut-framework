export interface VirtualDom {
  tag: string,
  props: any,
}

// 构建一个虚拟dom对象，类似于react中createElement
export const createVirtualDom = (tag: string, props: Record<string, any>): VirtualDom => {
  return {
    tag,
    props,
  }
}