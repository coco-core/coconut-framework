/**
 * 注解的运行时配置
 */
import {Metadata} from "../decorator/export";
import type {Class} from './export'
import {isPlainObject} from "../share/util.ts";

type FieldName = string | Symbol;

type MetadataSet = Array<{ metadata: Metadata; dependencies?: MetadataSet; }>

// 元数据类的元数据
const metadataForMetadata: Map<Class<Metadata>, { classMetadata: Metadata[] }> = new Map();
// 业务类的元数据
const metadataForBizClass: Map<Class<any>, { classMetadata: Metadata[], fieldMetadata: Map<FieldName, Metadata[]> }> = new Map();

function existSameMetadata(exited: Metadata[], metadataCls: Class<Metadata>): boolean {
  return exited.some(i => (i instanceof metadataCls));
}

function createMetadata(metadataCls: Class<Metadata>, args?: any): Metadata {
  const metadata = new metadataCls();
  if (isPlainObject(args)) {
    for (const key of Object.keys(args)) {
      metadata[key] = args[key];
    }
  } else {
    metadata.value = args;
  }
  return metadata;
}

function addClassMetadata(cls: Class<any>, MetadataCls: Class<Metadata>, args?: any) {
  let classMetadata: Metadata[];
  if (Object.getPrototypeOf(cls) === Metadata) {
    let config = metadataForMetadata.get(cls);
    if (!config) {
      config = {classMetadata: []}
      metadataForMetadata.set(cls, config);
    }
    classMetadata = config.classMetadata;
  } else {
    let config = metadataForBizClass.get(cls);
    if (!config) {
      config = {classMetadata: [], fieldMetadata: new Map()}
      metadataForBizClass.set(cls, config);
    }
    classMetadata = config.classMetadata;
  }
  if (__DEV__ && existSameMetadata(classMetadata, MetadataCls)) {
    console.warn(`${cls}已经存在相同的注解【${MetadataCls}】，忽略`);
    return
  }
  const metadata = createMetadata(MetadataCls, args);
  classMetadata.push(metadata)
}

function addFieldMetadata(
  Cls: Class<any>,
  fieldName: FieldName,
  MetadataCls: Class<Metadata>,
  args?: any,
) {
  if (__DEV__) {
    if (!metadataForBizClass.has(Cls)) {
      console.error('需要先给组件【', Cls, "】添加注解，字段注解才能生效")
      return;
    }
  }
  const {fieldMetadata} = metadataForBizClass.get(Cls);
  let fieldMetas = fieldMetadata.get(fieldName);
  if (!fieldMetas) {
    fieldMetas = [];
    fieldMetadata.set(fieldName, fieldMetas);
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
  const fields = []
  for (const [key, value] of this.fieldMetadata.entries()) {
    if (value.find(i => i instanceof MetadataCls)) {
      fields.push(key)
    }
  }
  return fields;
}

/**
 * 注解A上有配置另一个注解B，有的话返回注解对象，没有返回null
 * 例如Component注解有没有配置Scope注解
 * 因为注解B可能是注解A的注解的注解配置，所以需要递归查找
 */
function getClsAnnotation(Cls: Class<any>, MetadataCls: Class<Metadata>): Metadata | null {
  const configs = metadataForBizClass.get(Cls);
  if (!configs) {
    throw new Error(`未注册的组件：${Cls}`);
  }
  if (configs && configs.classMetadata.length) {
    for (const config of configs.classMetadata) {
      if (config instanceof MetadataCls) {
        // 找到，返回
        return config;
      }
      // 找到config对应的注解定义，看上面是否有AnnoCls
      // const find = getClsAnnotation(config.constructor, MetadataCls);
      // if (find) {
      //   return find;
      // }
    }
  }
  // 没有找到
  return null;
}

function clear() {
  metadataForBizClass.clear();
}

/**
 * 获取元数据
 */
function getMetadata(Cls?: Class<any>) {
  const result: MetadataSet = []
  if (Cls) {
    const config = Object.getPrototypeOf(Cls) === Metadata
      ? metadataForMetadata.get(Cls)
      : metadataForBizClass.get(Cls);
    if (config) {
      const {classMetadata} = config;
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
        })
      }
    }
  }
  return result;
}

function getAllMetadata() {
  return [metadataForMetadata, metadataForBizClass]
}

export {
  addClassMetadata,
  addFieldMetadata,
  getClsAnnotation,
  getFields,
  clear,
  getMetadata,
  getAllMetadata,
}
