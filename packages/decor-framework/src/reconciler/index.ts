import {createChild, deleteChildren} from "./dom";
import type {VirtualDom} from "../component";

export const reconciler = (oldElement: VirtualDom | null, newElement: VirtualDom, rootElement: Element) => {
  if (oldElement !== null) {
    // delete
    deleteChildren(rootElement);
  }

  // 创建
  createChild(rootElement, newElement);
}