// store Map<Function, Map<string, string[]>>
const meta = new Map();

export const MetaKeyReactive = 'reactive';
export const MetaKeyView = 'view';

/*
{
  class: {
    key: ['reactive']
  }
}
 */

// 注册一个注解
export const registerFields = (clz, metaKey, field) => {
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
  annotations.push(metaKey);
}

// 获取一个类上指定metaKey的field
export const getFields = (clz, metaKey) => {
  const fields = [];
  const entity = meta.get(clz);
  if (!entity) {
    return fields;
  }

  for (const [key, value] of entity.entries()) {
    if (value.indexOf(metaKey) !== -1) {
      fields.push(key)
    }
  }
  return fields;
}
