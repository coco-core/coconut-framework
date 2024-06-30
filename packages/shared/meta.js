// store Map<Function, Map<string, string[]>>
const meta = new Map();

const MetaKeyReactive = 'reactive';

/*
{
  class: {
    key: ['reactive']
  }
}
 */

// 注册一个reactive的field
export const registerReactiveFields = (clz, field) => {
  let entity = meta.get(clz);
  if (!entity) {
    entity = new Map();
    meta.set(clz, entity)
  }
  let annotations = entity.get(field);
  if (!annotations) {
    annotations = [];
    entity.set(field, annotations);
  }
  annotations.push(MetaKeyReactive);
}

// 获取一个类上所有定义了reactive的field
export const getReactiveFields = (clz) => {
  const fields = [];
  const entity = meta.get(clz);
  if (!entity) {
    return fields;
  }

  for (const [key, value] of entity.entries()) {
    if (value.indexOf(MetaKeyReactive) !== -1) {
      fields.push(key)
    }
  }
  return fields;
}
