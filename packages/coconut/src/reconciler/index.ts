import {Component, DecorComponent, VDom } from '../component';
import { Container } from '../dom';
import * as domHandler from '../dom/node';

const insVdMap: Map<Component, VDom> = new Map();

function doCreateComponent(vd: VDom, parentElm: HTMLElement) {
  const Constructor: DecorComponent = vd.type as unknown as DecorComponent;
  vd.instance = new Constructor();
  insVdMap.set(vd.instance, vd);
  const children = (vd.props.children = [vd.instance.render()]);
  for (const child of children) {
    doCreate(child, parentElm);
  }
}

function doCreateHost(vd: VDom, parentElm: HTMLElement) {
  const elm = (vd.elm = domHandler.createElement(
    vd.type as string,
    vd.props.onClick,
    vd.props.innerText,
  ));
  // 这里先挂载children，再挂载elm
  const children = vd.props.children ?? [];
  for (let child of Array.isArray(children) ? children : [children]) {
    if (typeof child === "object") {
      doCreate(child, elm);
    } else {
      elm.innerText = child;
    }
  }
  domHandler.appendChild(parentElm, elm);
}

function doCreate(vd: VDom, parentElm: HTMLElement) {
  switch (typeof vd.type) {
    case "string":
      doCreateHost(vd, parentElm);
      break;
    case "function":
      doCreateComponent(vd, parentElm);
      break;
    default:
      throw new Error(`未定义的虚拟dom类型: ${vd.type}`);
  }
}

function doUpdateHost(old: VDom, vd: VDom) {
  if (typeof vd.props.children === 'object') {
    if (Array.isArray(old.props.children)) {
      reconcileChildren(old.props.children, vd.props.children);
    } else {
      reconcileChildren([old.props.children], [vd.props.children]);
    }
  } else {
    domHandler.updateElement(old.elm, old.props.children, vd.props.children);
  }
}

function doUpdateComponent(old: VDom) {
  const newChild = [old.instance.render()];
  reconcileChildren(old.props.children, newChild);
}

function doUpdate(old: VDom, vd: VDom) {
  switch (typeof old.type) {
    case "string":
      doUpdateHost(old, vd);
      break;
    case "function":
      doUpdateComponent(old);
      break;
  }
}

function doRemove(vd: VDom) {}

function reconcileChildren(olds: VDom[], news: VDom[]) {
  const len = Math.max(olds.length, news.length);
  for (let idx = 0; idx < len; idx++) {
    reconcile(olds[idx], news[idx], olds[idx].elm);
  }

  // todo 处理长度不一致的情况
}

/*
 * 新老vd进行比较
 */
function reconcile(old: VDom | null, vd: VDom | null, parentElm: HTMLElement) {
  if (old === null && vd === null) {
    // todo dev下输出错误
    return;
  } else if (old === null) {
    doCreate(vd, parentElm);
  } else if (vd === null) {
    // doRemove(old);
  } else {
    if (vd.type === old.type) {
      doUpdate(old, vd);
    } else {
      // doRemove(old);
      // doCreate(vd);
    }
  }
}

// 初始化渲染
export function initRender(root: Container, app: VDom) {
  reconcile(null, app, root.elm);
  root.vdom = app;
}

// 更新渲染
export function updateRender(instance: Component) {
  const vd = insVdMap.get(instance);
  // todo 优化异步实现
  setTimeout(() => doUpdateComponent(vd), 10)
}
