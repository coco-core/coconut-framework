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
import { Self } from "./self.ts";

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
  MetadataCls: MetadataClass,
): (userParam: UserParam) => Decorator {
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
          if (MetadataCls === Self) {
            addClassMetadata(value, value, userParam);
          }
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