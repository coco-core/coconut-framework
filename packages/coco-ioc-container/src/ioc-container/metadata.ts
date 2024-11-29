/**
 * 注解的运行时配置
 */
import { isPlainObject } from '../share/util.ts';
import Metadata from '../decorator/metadata.ts';
import { type Field } from '../decorator/decorator-context.ts';
import { get, NAME } from 'shared';
import { type Scope } from '../decorator/scope.ts';

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
    for (const key of Object.keys(args)) {
      metadata[key] = args[key];
    }
  } else if (args !== undefined) {
    metadata.value = args;
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

// 找标记特定注解的所有字段
function getFields(Cls: Class<any>, MetadataCls: Class<any>) {
  const def = metadataForBizClass.get(Cls);
  if (!def) {
    return [];
  }
  const fields = [];
  for (const [key, value] of def.fieldMetadata.entries()) {
    if (value.find((i) => i instanceof MetadataCls)) {
      fields.push(key);
    }
  }
  return fields;
}

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

// 找类装饰器中是否包含scope装饰器
// 找类装饰的装饰器是否包含component元数据，如果包含的话返回其对应的scope对象
function findScopeMetadata(Cls: Class<any>): Scope | null {
  const classMetadataList = getClsMetadata(Cls);
  if (!classMetadataList) {
    return null;
  }
  const scope = classMetadataList.find((i) => i instanceof get(NAME.Scope));
  if (scope) {
    return scope as Scope;
  }
  for (const metadata of classMetadataList) {
    const metadataMetadataList = getClsMetadata(
      <Class<any>>metadata.constructor
    );
    // todo 所有的component都默认加一个scope对象，或者合并也行
    if (
      metadataMetadataList &&
      metadataMetadataList.find((i) => i instanceof get(NAME.Component))
    ) {
      for (const scope of metadataMetadataList) {
        if (scope instanceof get(NAME.Scope)) {
          return scope as Scope;
        }
      }
    }
  }

  return null;
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
  findScopeMetadata,
  getFields,
  getFieldMetadata,
  getClassMetadata,
  clear,
  getMetadata,
  getAllMetadata,
};
