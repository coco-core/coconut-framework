/**
 * 注解的运行时配置
 */
import {Metadata, Component, component} from "../metadata/export";
import type {Class} from './export'

type FieldName = string | Symbol;

type MetadataSet = Array<{ metadata: Metadata; dependencies?: MetadataSet; }>

const metadataRuntimeConfig: Map<
  Class<any>,
  {
    // 类
    // todo 这里不用Metadata，还需要添加元数据的元数据
    classMetadata: Metadata[]
    // 字段
    fieldMetadata: Map<FieldName, Metadata[]>
  }
> = new Map();

function existSameMetadata(exited: Metadata[], metadataCls: Class<Metadata>): boolean {
  return exited.some(i => (i instanceof metadataCls));
}

function addClassMetadata(Cls: Class<any>, MetadataCls: Class<Metadata>, args?: any) {
  let config = metadataRuntimeConfig.get(Cls);
  if (!config) {
    config = {classMetadata: [], fieldMetadata: new Map()}
    metadataRuntimeConfig.set(Cls, config);
  }
  const {classMetadata} = config;
  if (__DEV__ && existSameMetadata(classMetadata, MetadataCls)) {
    console.warn(`${Cls}已经存在相同的注解【${MetadataCls}】，忽略`);
    return
  }
  const anno = new MetadataCls();
  anno.postConstructor?.(args);
  classMetadata.push(anno)
}

function addFieldMetadata(
  Cls: Class<any>,
  fieldName: FieldName,
  MetadataCls: Class<Metadata>,
  args?: any,
) {
  if (__DEV__) {
    if (!metadataRuntimeConfig.has(Cls)) {
      console.error('需要先给组件【', Cls, "】添加注解，字段注解才能生效")
      return;
    }
  }
  const {fieldMetadata} = metadataRuntimeConfig.get(Cls);
  let fieldAnno = fieldMetadata.get(fieldName);
  if (!fieldAnno) {
    fieldAnno = [];
    fieldMetadata.set(fieldName, fieldAnno);
  }
  const anno = new MetadataCls();
  anno.postConstructor?.(args);
  fieldAnno.push(anno);
}

function isRegistered(Cls: Class<any>) {
  return metadataRuntimeConfig.has(Cls);
}

// 找标记特定注解的所有字段
function getFields(Cls: Class<any>, MetadataCls: Class<any>) {
  const def = metadataRuntimeConfig.get(Cls);
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
  const configs = metadataRuntimeConfig.get(Cls);
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
  metadataRuntimeConfig.clear();
}

/**
 * 获取元数据
 */
function getMetadata(Cls?: Class<any>) {
  const result: MetadataSet = []
  if (Cls && metadataRuntimeConfig.has(Cls)) {
    const { classMetadata} = metadataRuntimeConfig.get(Cls);
    for (const metadata of classMetadata) {
      const dependencies = getMetadata(metadata.constructor);
      result.push({
        metadata,
        dependencies,
      })
    }
  }
  return result;
}

export {
  addClassMetadata,
  addFieldMetadata,
  getClsAnnotation,
  isRegistered,
  getFields,
  clear,
  getMetadata,
}
