import {Context, Decorator, KindClass, KindField, Target,} from "../metadata/export.ts";
import {addClassMetadata, addFieldMetadata, getClsAnnotation,} from "../ioc-container/metadata-runtime-config.ts";
import {MetadataClass} from "../metadata/metadata.ts";
import {FieldContext} from "../metadata/decorator-context.ts";
import {TargetType} from "./target.ts";
import {addDefinition} from "../ioc-container/bean-factory.ts";
import {Component} from "./component.ts";
import type {BeanName} from "./component.ts";

function assetsTarget(Metadata: MetadataClass, context: Context) {
  const target = <Target>getClsAnnotation(Metadata, Target);
  if (!target) {
    if (__DEV__) {
      console.warn(`${Metadata}需要添加target来确定装饰范围!!`);
    }
    return;
  }
  if (!target.value.includes(context.kind as TargetType)) {
    throw new Error(`${Metadata.name}只能装饰${target.value}`);
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

function genDecorator<UserParam, C extends Context>(Metadata: MetadataClass, initializer?: any): (userParam: UserParam) => Decorator;
function genDecorator<UserParam, C extends Context>(DecorateSelf: true, initializer?: any): (userParam: UserParam) => Decorator;
function genDecorator<UserParam, C extends Context>(
  MetadataOrDecorateSelf: MetadataClass | true,
  initializer?: any,
): (userParam: UserParam) => Decorator {
  return function (userParam: UserParam) {
    return function (value, context: C) {
      const Metadata = MetadataOrDecorateSelf === true ? value : MetadataOrDecorateSelf;
      switch (context.kind) {
        case KindClass:
          addClassMetadata(value, Metadata, userParam);
          if (Metadata === Component) {
            addDefinition(<BeanName>userParam ?? clsName2beanName(context.name), value);
          }
          break;
        default:
          break;
      }
      context.addInitializer(function () {
        switch (context.kind) {
          case KindField:
            addFieldMetadata(this.constructor, (<FieldContext>context).name, Metadata, userParam);
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