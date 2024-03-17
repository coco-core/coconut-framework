import { DecorComponent, VDom, VDomType } from '../component';
import { Container } from '../dom';
import * as domHandler from '../dom/node';

function doCreateComponent(vd: VDom, parentElm: HTMLElement) {
  const Constructor: DecorComponent = vd.tag as unknown as DecorComponent;
  vd.instance = new Constructor();
  const children = (vd.props.children = [vd.instance.render()]);
  for (const child of children) {
    doCreate(child, parentElm);
  }
}

function doCreateHost(vd: VDom, parentElm: HTMLElement) {
  const elm = (vd.elm = domHandler.createElement(
    vd.tag as string,
    vd.props.onClick,
    vd.props.innerText,
  ));
  // 这里先挂载children，再挂载elm
  const children = vd.props.children ?? [];
  for (let child of children) {
    doCreate(child, elm);
  }
  domHandler.appendChild(parentElm, elm);
}

function doCreate(vd: VDom, parentElm: HTMLElement) {
  switch (vd.type) {
    case VDomType.Host:
      doCreateHost(vd, parentElm);
      break;
    case VDomType.Component:
      doCreateComponent(vd, parentElm);
      break;
    default:
      throw new Error(`未定义的虚拟dom类型: ${vd.type}`);
  }
}

function doUpdateHost(old: VDom, vd: VDom) {
  domHandler.updateElement(old.elm, old.props.innerText, vd.props.innerText);
  if (old.props.children?.length && vd.props.children?.length) {
    reconcileChildren(old.props.children, vd.props.children);
  }
}

function doUpdateComponent(old: VDom, vd: VDom) {
  const newChild = (vd.props.children = [old.instance.render()]);
  reconcileChildren(old.props.children, newChild);
}

function doUpdate(old: VDom, vd: VDom) {
  switch (old.type) {
    case VDomType.Host:
      doUpdateHost(old, vd);
      break;
    case VDomType.Component:
      doUpdateComponent(old, vd);
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
    if (vd.type === old.type && vd.tag === old.tag) {
      doUpdate(old, vd);
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
