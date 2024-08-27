import { REACT_ELEMENT_TYPE } from 'shared/index.js';

const h = (component, props) => {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: component,
    props,
  };
};

export const jsx = h;
export const jsxs = h;
