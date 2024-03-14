import { VDom, VDomType } from '../component';
import { Container } from '../dom';
import * as domHandler from '../dom/node';
import { updateElement } from '../dom/node';

function createComponent(vd: VDom, parentElm: HTMLElement): HTMLElement {
  const Constructor = vd.cons;
  vd.instance = new Constructor();
  const child = vd.instance.render();
  vd.props.children = [child];
  return doCreate(child, parentElm);
}

function updateComponent(old: VDom, vd: VDom) {
  const newChild = old.instance.render();
  return reconcileChildren(old.props.children, [newChild]);
}

function doCreate(vd: VDom, parentElm: HTMLElement): HTMLElement {
  switch (vd.type) {
    case VDomType.Host:
      const elm = (vd.elm = domHandler.createElement(vd));
      const children = vd.props.children ?? [];
      for (let child of children) {
        doCreate(child, elm);
      }
      domHandler.appendChild(parentElm, elm);
      return elm;
    case VDomType.Component:
      return createComponent(vd, parentElm);
    default:
      throw new Error(`不知道的虚拟dom类型: ${vd.type}`);
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
    if (vd.type === old.type && vd.tag === old.tag && vd.cons === old.cons) {
      // update
      switch (old.type) {
        case VDomType.Host:
          updateElement(old, vd);
          if (old.props.children?.length && vd.props.children?.length) {
            reconcileChildren(old.props.children, vd.props.children);
          }
          break;
        case VDomType.Component:
          updateComponent(old, vd);
          break;
      }
    } else {
      // doRemove(old);
      // doCreate(vd);
    }
  }
}

// todo先放在这里，后续删除
let _root;
let _app;
// 初始化渲染
export function initRender(root: Container, app: VDom) {
  _root = root;
  _app = app;
  reconcile(null, app, root.elm);
  root.vdom = app;
}

// 更新渲染
export function updateRender() {
  reconcile(_root.vdom, _app, _root.elm);
}
