import {createChild, deleteChildren} from "../dom/dom";
import type {VirtualDom} from "../component";
import {Root} from "../dom";

export const reconciler = (root: Root | null, newElement: VirtualDom) => {
  // if (oldElement !== null) {
  //   // delete
  //   deleteChildren(rootElement);
  // }

  // 创建
  createChild(root.elm, newElement);
}