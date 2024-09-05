import {Context, Decorator, KindClass, KindField, Target} from "../annotation/export.ts";
import {addClsAnnotation, addFieldAnnotation, getClsAnnotation,} from "../ioc-container/annotation-runtime-config.ts";
import {AnnotationCls} from "../annotation/abs-annotation.ts";
import {FieldContext} from "../annotation/decorator-context.ts";
import {TargetType} from "./target.ts";
import {addDefinition} from "../ioc-container/bean-factory.ts";
import {Component} from "./component.ts";
import type {BeanName} from "./component.ts";

function assetsTarget(Annotation: AnnotationCls, context: Context) {
  if (!Annotation.ignoreTargetCheck) {
    const target = <Target>getClsAnnotation(Annotation, Target);
    if (!target) {
      if (__DEV__) {
        console.warn(`${Annotation}需要添加target来确定装饰范围!!`);
      }
      return;
    }
    if (!target.value.includes(context.kind as TargetType)) {
      throw new Error(`${Annotation.name}只能装饰${target.value}`);
    }
  }
}

/**
 * 由类名得到bean名称
 * 第一个字母改为小写，其他不变
 */
function clsName2beanName(clsName: string) {
  if (!clsName) {
    if (__DEV__ && typeof clsName !== 'string') {
      throw new Error(`不正常的clsName:[${clsName}]`)
    }
  }
  return clsName[0].toLowerCase() + clsName.slice(1);
}

function genDecorator<UserParam, C extends Context>(
  Annotation: AnnotationCls,
  initializer?: any,
): (userParam: UserParam) => Decorator {
  return function (userParam: UserParam){
    return function (value, context: C) {
      assetsTarget(Annotation, context);
      switch (context.kind) {
        case KindClass:
          addClsAnnotation(value, Annotation, userParam);
          if (Annotation === Component) {
            addDefinition(<BeanName>userParam ?? clsName2beanName(context.name), value);
          }
          break;
        default:
          break;
      }
      context.addInitializer(function(){
        switch (context.kind) {
          case KindField:
            addFieldAnnotation(this.constructor, (<FieldContext>context).name, Annotation, userParam);
            break;
          default:
            return;
        }
        initializer?.();
      })
      return undefined;
    }
  }
}

export default genDecorator;