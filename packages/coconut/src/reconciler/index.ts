import {Component, DecorComponent, VDom } from '../component';
import { Container } from '../dom';
import * as domHandler from '../dom/node';

// 组件实例 <===> vd
const insVdMap: Map<Component, VDom> = new Map();

function doCreateComponent(parent: HTMLElement, vd: VDom) {
  const Constructor: DecorComponent = vd.type as unknown as DecorComponent;
  vd.instance = new Constructor();
  insVdMap.set(vd.instance, vd);
  const child = vd.instance.render();
  vd.props.children = [child];
  vd.elm = doCreate(parent, child);
  return vd.elm;
}

function doCreateHost(parent: HTMLElement, vd: VDom) {
  const elm = (vd.elm = domHandler.createElement(
    vd.type as string,
    vd.props.onClick,
    vd.props.innerText,
  ));
  const children = vd.props.children ?? [];
  for (let child of Array.isArray(children) ? children : [children]) {
    if (typeof child === "object") {
      const childElm = doCreate(elm, child);
      if (childElm) {
        domHandler.appendChild(elm, childElm);
      }
    } else {
      elm.innerText = child;
    }
  }
  return elm;
}

function doCreate(parent: HTMLElement, vd: VDom): HTMLElement {
  let elm: HTMLElement;
  switch (typeof vd.type) {
    case "string":
      elm = doCreateHost(parent, vd);
      break;
    case "function":
      elm = doCreateComponent(parent, vd);
      break;
    default:
      throw new Error(`未定义的虚拟dom类型: ${vd.type}`);
  }
  vd.parentElm = parent;
  return elm;
}

function doUpdateHost(parent: HTMLElement, old: VDom, vd: VDom) {
  if (typeof vd.props.children === 'object') {
    if (Array.isArray(old.props.children)) {
      reconcileArray(parent, old.props.children, vd.props.children);
    } else {
      reconcileArray(parent, [old.props.children], [vd.props.children]);
    }
  } else {
    domHandler.updateElement(old.elm, old.props.children, vd.props.children);
  }
}

function doUpdateComponent(parent: HTMLElement, old: VDom) {
  const newChild = [old.instance.render()];
  reconcileArray(parent, old.props.children, newChild);
  old.props.children = newChild;
}

function doUpdate(parent: HTMLElement, old: VDom, vd: VDom) {
  switch (typeof old.type) {
    case "string":
      doUpdateHost(parent, old, vd);
      break;
    case "function":
      doUpdateComponent(parent, old);
      break;
  }
}

function doRemove(vd: VDom) {
  switch (typeof vd.type) {
    case 'function':
      insVdMap.delete(vd.instance);
      domHandler.deleteChildren(vd.parentElm, vd.elm)
      break;
  }
}

function reconcileArray(parentElm: HTMLElement, olds: VDom[], news: VDom[]) {
  const len = Math.max(olds.length, news.length);
  for (let idx = 0; idx < len; idx++) {
    reconcile(parentElm, olds[idx], news[idx]);
  }

  // todo 处理长度不一致的情况
}

/*
 * 新老vd进行比较
 */
function reconcile(parent: HTMLElement, old?: VDom | false, vd?: VDom | false) {
  if (!old && !vd) {
    // todo dev下输出错误
    return;
  } else if (!old) {
    const elm = doCreate(parent, vd as VDom);
    domHandler.appendChild(parent, elm);
  } else if (!vd) {
    doRemove(old);
  } else {
    if (vd.type === old.type) {
      doUpdate(parent, old, vd);
    } else {
      // doRemove(old);
      // doCreate(vd);
    }
  }
}

// 初始化渲染
export function initRender(root: Container, app: VDom) {
  reconcile(root.elm, null, app);
  root.vdom = app;
}

// 更新渲染
export function updateRender(instance: Component) {
  const vd = insVdMap.get(instance);
  // todo 优化异步实现
  setTimeout(() => doUpdateComponent(vd.parentElm, vd), 10)
}
