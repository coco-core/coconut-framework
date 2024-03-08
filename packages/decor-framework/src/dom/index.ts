import {VirtualDom} from "../component";
import {reconciler} from "../reconciler";

export interface Root {
  elm: Element,
  render: (vd: VirtualDom) => void
}

export const createRoot = (elm: Element): Root => {
  const root: Root = {
    elm,
    render: (vd: VirtualDom) => {
      reconciler(root, vd)
    }
  };

  return root;
}