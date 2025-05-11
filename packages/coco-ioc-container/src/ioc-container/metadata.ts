import Metadata, { createMetadata } from '../metadata/abstract/metadata.ts';
import { type Field } from './decorator-context.ts';
import { register, NAME } from 'shared';

type MetadataSet = Array<{ metadata: Metadata; dependencies?: MetadataSet }>;

// 元数据子类的元数据
const metadataForMetadata: Map<
  Class<Metadata>,
  { classMetadata: Metadata[] }
> = new Map();
// 非元数据子类（业务类）的元数据
const metadataForBizClass: Map<
  Class<any>,
  {
    classMetadata: Metadata[];
    fieldMetadata: Map<Field, Metadata[]>;
  }
> = new Map();

function getFromMap(Cls: Class<any>) {
  const value: {
    classMetadata: Metadata[];
    fieldMetadata?: Map<Field, Metadata[]>;
  } =
    Object.getPrototypeOf(Cls) === Metadata
      ? metadataForMetadata.get(Cls)
      : metadataForBizClass.get(Cls);
  if (!value) {
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
  }
  return value;
}

function addToMap(cls: Class<any>) {
  let config;
  if (Object.getPrototypeOf(cls) === Metadata) {
    config = metadataForMetadata.get(cls);
    if (!config) {
      config = { classMetadata: [] };
      metadataForMetadata.set(cls, config);
    }
  } else {
    config = metadataForBizClass.get(cls);
    if (!config) {
      config = { classMetadata: [], fieldMetadata: new Map() };
      metadataForBizClass.set(cls, config);
    }
  }
  return config;
}

function existSameMetadata(
  exited: Metadata[],
  metadataCls: Class<Metadata>
): boolean {
  return exited.some((i) => i instanceof metadataCls);
}

function addClassMetadata(
  cls: Class<any>,
  MetadataCls?: Class<Metadata>,
  args?: any
) {
  let config = getFromMap(cls);
  if (!config) {
    config = addToMap(cls);
  }
  const classMetadata: Metadata[] = config.classMetadata;
  if (MetadataCls) {
    if (__DEV__ && existSameMetadata(classMetadata, MetadataCls)) {
      console.warn(`${cls}已经存在相同的注解【${MetadataCls}】，忽略`);
      return;
    }
    const metadata = createMetadata(MetadataCls, args);
    classMetadata.push(metadata);
  }
}

function addFieldOrMethodMetadata(
  Cls: Class<any>,
  fieldName: Field,
  MetadataCls: Class<Metadata>,
  args?: any
) {
  let config = getFromMap(Cls);
  if (!config) {
    config = addToMap(Cls);
  }
  if (Object.getPrototypeOf(Cls) === Metadata) {
    throw new Error('目前元数据的类只支持类装饰器');
  }
  const { fieldMetadata } = config;
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
 * 获取指定类的类元数据
 * @param Cls 指定类
 * @param findMetadataCls 如果不指定，返回全部；否则进行列表过滤
 */
function listClassMetadata(Cls: Class<any>, findMetadataCls?: Class<any>) {
  const value = getFromMap(Cls);
  if (!value) {
    return [];
  }

  return value.classMetadata.filter((i) => {
    return findMetadataCls ? i instanceof findMetadataCls : true;
  });
}

/**
 * 获取指定类的指定field（method）的元数据
 * @param Cls 指定类
 * @param field 指定field名或method名
 * @param findMetadataCls 如果不指定，返回全部；否则进行列表过滤
 */
function listFieldMetadata(
  Cls: Class<any>,
  field: Field,
  findMetadataCls?: Class<any>
) {
  const value = getFromMap(Cls);
  if (!value) {
    return [];
  }
  return value.fieldMetadata.get(field).filter((i) => {
    return findMetadataCls ? i instanceof findMetadataCls : true;
  });
}

/**
 * 在类的所有类元数据中递归查找某个元数据类，找到就直接返回
 */
function findClassMetadata(
  Cls: Class<any>,
  TargetCls: Class<any>,
  upward: number = 0
) {
  if (upward < 0) {
    return null;
  }
  const classMetadataList = listClassMetadata(Cls);
  if (!classMetadataList) {
    return null;
  }
  const instance = classMetadataList.find((i) => i instanceof TargetCls);
  if (instance) {
    return instance;
  }
  for (const metadata of classMetadataList) {
    const find = findClassMetadata(
      <Class<any>>metadata.constructor,
      TargetCls,
      upward - 1
    );
    if (find) {
      return find;
    }
  }

  return null;
}

/**
 * 返回包含特定元数据类的所有field
 * @param Cls 指定类
 * @param MetadataCls 要包含的元数据类
 * @param includeCompound 是否也返回包含了MetadataCls的元数据
 */
function listFieldByMetadataCls(
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
register(NAME.getFields, listFieldByMetadataCls);

// 找到特定类装饰器
function listBeDecoratedClsByClassMetadata(
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
function listBeDecoratedClsByFieldMetadata(
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
  addFieldOrMethodMetadata,
  listClassMetadata,
  listFieldMetadata,
  findClassMetadata,
  listFieldByMetadataCls,
  listBeDecoratedClsByClassMetadata,
  listBeDecoratedClsByFieldMetadata,
  clear,
  getMetadata,
  getAllMetadata,
};
