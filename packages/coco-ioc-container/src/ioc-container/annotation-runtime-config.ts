/**
 * 注解的运行时配置
 */
import {Annotation, Component} from "../annotation/export";
import type { Class } from './export'

type field = string;

const annotationRuntimeConfig: Map<
  Class<any>,
  {
    // 类
    classAnnotation: Annotation[]
    // 字段
    fieldAnnotation: Map<field, Annotation[]>
  }
> = new Map();

function ifClsAnnotationExit(exited: Annotation[], Anno: Class<Annotation>): boolean {
  return exited.some(i => (i instanceof Anno));
}

function addClsAnnotation(component: Class<any>, AnnoCls: Class<Annotation>, args?: any) {
  let config = annotationRuntimeConfig.get(component);
  if (!config) {
    config = {classAnnotation: [], fieldAnnotation: new Map()}
    annotationRuntimeConfig.set(component, config);
  } else {
    const {classAnnotation} = config;
    if (__DEV__ && ifClsAnnotationExit(classAnnotation, AnnoCls)) {
      console.warn(`${component}已经存在相同的注解【${AnnoCls}】，忽略`);
      return
    }
    classAnnotation.push(new AnnoCls(args))
  }
}

function addFieldAnnotation(
  component: Class<any>,
  fieldName: string,
  annotation: Annotation,
) {
  if (__DEV__) {
    if (!annotationRuntimeConfig.has(component)) {
      console.error('需要先给组件【', component, "】添加注解，字段注解才能生效")
      return;
    }
  }
  const {fieldAnnotation} = annotationRuntimeConfig.get(component);
  let fieldAnno = fieldAnnotation.get(fieldName);
  if (!fieldAnno) {
    fieldAnno = [];
    this.fieldAnnotation.set(fieldName, fieldAnno);
  }
  fieldAnno.push(annotation);
}

function isRegistered(component: Class<any>) {
  return annotationRuntimeConfig.has(component);
}

// 找标记特定注解的所有字段
function getFields(component: Class<any>, Annotation: Class<any>) {
  const def = annotationRuntimeConfig.get(component);
  if (!def) {
    return [];
  }
  const fields = []
  for (const [key, value] of this.fieldAnnotation.entries()) {
    if (value.find(i => i instanceof Annotation)) {
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
function getClsAnnotation(component: Class<Annotation>, AnnoCls: Class<Annotation>): Annotation | null {
  const configs = annotationRuntimeConfig.get(component);
  if (configs && configs.classAnnotation.length) {
    for (const config of configs.classAnnotation) {
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

function forceClear_4test() {
  annotationRuntimeConfig.clear();
}

export {
  addClsAnnotation,
  addFieldAnnotation,
  getClsAnnotation,
  isRegistered,
  getFields,
  forceClear_4test
}
