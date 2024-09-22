/**
 * 注解的运行时配置
 */
import {Metadata, Component} from "../metadata/export";
import type {Class} from './export'

type FieldName = string | Symbol;

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

function ifClsAnnotationExit(exited: Metadata[], Anno: Class<Metadata>): boolean {
  return exited.some(i => (i instanceof Anno));
}

function addClassMetadata(component: Class<any>, AnnoCls: Class<Metadata>, args?: any) {
  let config = metadataRuntimeConfig.get(component);
  if (!config) {
    config = {classMetadata: [], fieldMetadata: new Map()}
    metadataRuntimeConfig.set(component, config);
  }
  const {classMetadata} = config;
  if (__DEV__ && ifClsAnnotationExit(classMetadata, AnnoCls)) {
    console.warn(`${component}已经存在相同的注解【${AnnoCls}】，忽略`);
    return
  }
  const anno = new AnnoCls();
  anno.postConstructor?.(args);
  classMetadata.push(anno)
}

function addFieldMetadata(
  component: Class<any>,
  fieldName: FieldName,
  AnnoCls: Class<Metadata>,
  args?: any,
) {
  if (__DEV__) {
    if (!metadataRuntimeConfig.has(component)) {
      console.error('需要先给组件【', component, "】添加注解，字段注解才能生效")
      return;
    }
  }
  const {fieldMetadata} = metadataRuntimeConfig.get(component);
  let fieldAnno = fieldMetadata.get(fieldName);
  if (!fieldAnno) {
    fieldAnno = [];
    fieldMetadata.set(fieldName, fieldAnno);
  }
  const anno = new AnnoCls();
  anno.postConstructor?.(args);
  fieldAnno.push(anno);
}

function isRegistered(component: Class<any>) {
  return metadataRuntimeConfig.has(component);
}

// 找标记特定注解的所有字段
function getFields(component: Class<any>, Metadata: Class<any>) {
  const def = metadataRuntimeConfig.get(component);
  if (!def) {
    return [];
  }
  const fields = []
  for (const [key, value] of this.fieldMetadata.entries()) {
    if (value.find(i => i instanceof Metadata)) {
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
function getClsAnnotation(component: Class<any>, AnnoCls: Class<Metadata>): Metadata | null {
  const configs = metadataRuntimeConfig.get(component);
  if (!configs) {
    throw new Error(`未注册的组件：${component}`);
  }
  if (configs && configs.classMetadata.length) {
    for (const config of configs.classMetadata) {
      if (config instanceof AnnoCls) {
        // 找到，返回
        return config;
      }
      // 找到config对应的注解定义，看上面是否有AnnoCls
      // const find = getClsAnnotation(config.constructor, AnnoCls);
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

export {
  addClassMetadata,
  addFieldMetadata,
  getClsAnnotation,
  isRegistered,
  getFields,
  clear,
}
