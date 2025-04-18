import { isPlainObject } from '../share/util.ts';
import Metadata, { defaultProp } from '../metadata/metadata.ts';
import { type Field } from '../decorator/decorator-context.ts';
import { register, NAME } from 'shared';
import Component from '../metadata/component.ts';

type MetadataSet = Array<{ metadata: Metadata; dependencies?: MetadataSet }>;

// 元数据类的元数据
const metadataForMetadata: Map<
  Class<Metadata>,
  { classMetadata: Metadata[] }
> = new Map();
// 业务类的元数据
const metadataForBizClass: Map<
  Class<any>,
  {
    classMetadata: Metadata[];
    fieldMetadata: Map<Field, Metadata[]>;
  }
> = new Map();

function existSameMetadata(
  exited: Metadata[],
  metadataCls: Class<Metadata>
): boolean {
  return exited.some((i) => i instanceof metadataCls);
}

function createMetadata(metadataCls: Class<Metadata>, args?: any): Metadata {
  const metadata = new metadataCls();
  if (isPlainObject(args)) {
    for (const key of Object.getOwnPropertyNames(args)) {
      metadata[key] = args[key];
    }
  } else if (args !== undefined) {
    const keys = Object.getOwnPropertyNames(metadata);
    const propName = keys.length ? keys[0] : defaultProp;
    (metadata as any)[propName] = args;
  }
  return metadata;
}

function addClassMetadata(
  cls: Class<any>,
  MetadataCls?: Class<Metadata>,
  args?: any
) {
  let classMetadata: Metadata[];
  if (Object.getPrototypeOf(cls) === Metadata) {
    let config = metadataForMetadata.get(cls);
    if (!config) {
      config = { classMetadata: [] };
      metadataForMetadata.set(cls, config);
    }
    classMetadata = config.classMetadata;
  } else {
    let config = metadataForBizClass.get(cls);
    if (!config) {
      config = { classMetadata: [], fieldMetadata: new Map() };
      metadataForBizClass.set(cls, config);
    }
    classMetadata = config.classMetadata;
  }
  if (MetadataCls) {
    if (__DEV__ && existSameMetadata(classMetadata, MetadataCls)) {
      console.warn(`${cls}已经存在相同的注解【${MetadataCls}】，忽略`);
      return;
    }
    const metadata = createMetadata(MetadataCls, args);
    classMetadata.push(metadata);
  }
}

function addFieldMethodMetadata(
  Cls: Class<any>,
  fieldName: Field,
  MetadataCls: Class<Metadata>,
  args?: any
) {
  if (__DEV__) {
    if (!metadataForBizClass.has(Cls)) {
      console.error('需要先给组件【', Cls, '】添加注解，字段注解才能生效');
      return;
    }
  }
  const { fieldMetadata } = metadataForBizClass.get(Cls);
  let fieldMetas = fieldMetadata.get(fieldName);
  if (!fieldMetas) {
    fieldMetas = [];
    fieldMetadata.set(fieldName, fieldMetas);
  }
  if (fieldMetas.find((i) => i instanceof MetadataCls)) {
    if (__TEST__) {
      throw new Error('相同的Field装饰器装饰了2次!');
    }
  }
  const metadata = createMetadata(MetadataCls, args);
  fieldMetas.push(metadata);
}

/**
 * 返回包含特定元数据的所有field
 * @param Cls 指定类
 * @param MetadataCls 要包含的元数据类
 * @param includeCompound 是否也返回包含了MetadataCls的元数据
 */
function getFields(
  Cls: Class<any>,
  MetadataCls: Class<any>,
  includeCompound: boolean = false
): Metadata[] {
  const def = metadataForBizClass.get(Cls);
  if (!def) {
    return [];
  }
  const fields = [];
  for (const [key, value] of def.fieldMetadata.entries()) {
    if (value.find((i) => i instanceof MetadataCls)) {
      fields.push(key);
    } else if (includeCompound) {
      for (const metadata of value) {
        const def = metadataForMetadata.get(<Class<any>>metadata.constructor);
        if (def.classMetadata.find((i) => i instanceof MetadataCls)) {
          fields.push(key);
        }
      }
    }
  }
  return fields;
}
register(NAME.getFields, getFields);

// 获取特定field的所有元数据
function getFieldMetadata(
  Cls: Class<any>,
  field: Field,
  MetadataCls: Class<any>
) {
  const def = metadataForBizClass.get(Cls);
  if (!def) {
    return [];
  }
  return def.fieldMetadata.get(field).filter((i) => i instanceof MetadataCls);
}

function getClassMetadata(Cls: Class<any>, MetadataCls: Class<any>) {
  const def = metadataForBizClass.get(Cls);
  if (!def) {
    return [];
  }
  return def.classMetadata.filter((i) => i instanceof MetadataCls);
}

/**
 * 找到Cls上面的所有类元数据
 */
function getClsMetadata(Cls: Class<any>): Metadata[] | null {
  const configs =
    Object.getPrototypeOf(Cls) === Metadata
      ? metadataForMetadata.get(Cls)
      : metadataForBizClass.get(Cls);
  if (!configs) {
    if (__DEV__) {
      console.error(
        `未注册的组件：`,
        Cls,
        Object.getPrototypeOf(Cls),
        Metadata,
        metadataForMetadata,
        metadataForBizClass
      );
    }
    return null;
  }
  return configs.classMetadata;
}

// 找到component元数据，同样也找元数据对应的类是否包含component元数据
function findComponentMetadata(Cls: Class<any>): Component | null {
  return doFindComponentMetadata(Cls, 3);
}
function doFindComponentMetadata(
  Cls: Class<any>,
  level: number = 0
): Component | null {
  if (level <= 0) {
    return null;
  }
  const classMetadataList = getClsMetadata(Cls);
  if (!classMetadataList) {
    return null;
  }
  const component = classMetadataList.find((i) => i instanceof Component);
  if (component) {
    return component as Component;
  }
  for (const metadata of classMetadataList) {
    const find = doFindComponentMetadata(
      <Class<any>>metadata.constructor,
      level - 1
    );
    if (find) {
      return find;
    }
  }

  return null;
}

// 找到特定类装饰器
function getByClassMetadata(
  MetadataCls: Class<any>
): Map<Class<any>, Metadata> {
  const rlt = new Map<Class<any>, Metadata>();
  for (const [
    beDecoratedCls,
    { classMetadata },
  ] of metadataForBizClass.entries()) {
    const find = classMetadata.find((i) => i instanceof MetadataCls);
    if (find) {
      rlt.set(beDecoratedCls, find);
    }
  }
  return rlt;
}

// 指定一个元数据类，找到所有在field上装饰的类
function getByFieldMetadata(
  MetadataCls: Class<any>
): Map<Class<any>, { field: Field; metadata: Metadata }> {
  const rlt = new Map<Class<any>, { field: Field; metadata: Metadata }>();
  for (const [
    beDecoratedCls,
    { fieldMetadata },
  ] of metadataForBizClass.entries()) {
    for (const [field, metadataList] of fieldMetadata.entries()) {
      if (metadataList) {
        const find = metadataList.find((i) => i instanceof MetadataCls);
        if (find) {
          rlt.set(beDecoratedCls, { field, metadata: find });
        }
      }
    }
  }
  return rlt;
}

function clear() {
  metadataForMetadata.clear();
  metadataForBizClass.clear();
}

/**
 * 获取元数据
 */
function getMetadata(Cls?: Class<any>) {
  const result: MetadataSet = [];
  if (Cls) {
    const config =
      Object.getPrototypeOf(Cls) === Metadata
        ? metadataForMetadata.get(Cls)
        : metadataForBizClass.get(Cls);
    if (config) {
      const { classMetadata } = config;
      for (const metadata of classMetadata) {
        let dependencies;
        if (metadata.constructor === Cls) {
          // 自己装饰自己
          dependencies = [];
        } else {
          dependencies = getMetadata(metadata.constructor as Class<any>);
        }
        result.push({
          metadata,
          dependencies,
        });
      }
    }
  }
  return result;
}

function getAllMetadata() {
  return [metadataForMetadata, metadataForBizClass];
}

export {
  addClassMetadata,
  addFieldMethodMetadata,
  findComponentMetadata,
  getFields,
  getFieldMetadata,
  getClassMetadata,
  getByClassMetadata,
  getByFieldMetadata,
  clear,
  getMetadata,
  getAllMetadata,
};
