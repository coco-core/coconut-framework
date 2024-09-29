import {Context, Decorator, KindClass, KindField, Target,} from "../metadata/export.ts";
import {addClassMetadata, addFieldMetadata, getClsAnnotation,} from "../ioc-container/metadata-runtime-config.ts";
import {MetadataClass} from "../metadata/metadata.ts";
import {FieldContext} from "../metadata/decorator-context.ts";
import {TargetType} from "./target.ts";
import {addDefinition} from "../ioc-container/bean-factory.ts";
import {Component} from "./component.ts";
import type {BeanName} from "./component.ts";
import {exec, apply} from "../_test_helper/decorator.ts";
import {lowercaseFirstLetter} from "../share/util.ts";

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

function genDecorator<UserParam, C extends Context>(
  params: {
    /**
     * 装饰器对应的元数据类
     */
    MetadataCls: MetadataClass,
    /**
     * 有时候装饰器需要装饰在对应的元数据类上，就可以传入这个参数，这个参数会回传给postConstructor函数
     * todo 最好还是改成@target()的形式
     */
    decoratorSelfParams?: UserParam
  }
): (userParam: UserParam) => Decorator {
  const {MetadataCls, decoratorSelfParams} = params;
  if (decoratorSelfParams) {
    addClassMetadata(MetadataCls, MetadataCls, decoratorSelfParams);
  }
  const decoratorName = lowercaseFirstLetter(MetadataCls.name);
  return function (userParam: UserParam) {
    if (__TEST__) {
      exec(decoratorName, userParam);
    }
    return function (value, context: C) {
      if (__TEST__) {
        apply(decoratorName, userParam);
      }
      switch (context.kind) {
        case KindClass:
          addClassMetadata(value, MetadataCls, userParam);
          if (MetadataCls === Component) {
            addDefinition(<BeanName>userParam ?? lowercaseFirstLetter(context.name), value);
          }
          break;
        default:
          break;
      }
      context.addInitializer(function () {
        switch (context.kind) {
          case KindField:
            addFieldMetadata(this.constructor, (<FieldContext>context).name, MetadataCls, userParam);
            break;
          default:
            return;
        }
      })
      return undefined;
    }
  }
}

export default genDecorator;