// create vdom
import { DecorComponent, VDom, } from "../component";

const h = (
  component: string | DecorComponent,
  props: Record<string, any>,
): VDom => {
  return {
    type: component,
    props,
  };
};

export const jsx = h;
export const jsxs = h
