import { REACT_ELEMENT_TYPE } from '../../../shared/src';

const RESERVED_PROPS = {
  ref: true,
};

const h = (component: any, config: Record<any, any>) => {
  const props = {};
  let ref = null;
  let key = null;

  if (config?.ref) {
    ref = config.ref;
  }

  for (let propName in config) {
    if (
      Object.hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  } // Resolve default props

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: component,
    key,
    ref,
    props,
  };
};

export const jsx = h;
export const jsxs = h;
