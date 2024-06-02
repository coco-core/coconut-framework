// create vdom
import { DecorComponent, VDom, } from "../component";
import { REACT_ELEMENT_TYPE } from "../shared/index.js";

const h = (
  component: string | DecorComponent,
  props: Record<string, any>,
): VDom => {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: component,
    props,
  };
};

export const jsx = h;
export const jsxs = h
