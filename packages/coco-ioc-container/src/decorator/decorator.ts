import {Context, Decorator, KindClass, KindField, KindMethod, MethodContext,} from "../decorator/export.ts";
import {
  associateClassMetadata,
  associateFieldMetadata,
  getClsMetadata,
} from "../ioc-container/metadata.ts";
import {MetadataClass} from "./metadata.ts";
import {FieldContext} from "./decorator-context.ts";
import {addDefinition} from "../ioc-container/bean-factory.ts";
import type {BeanName} from "./component.ts";
import {Component} from "./component.ts";
import {apply, exec} from "../_test_helper/decorator.ts";
import {lowercaseFirstLetter} from "../share/util.ts";
import {Class} from "../ioc-container/export.ts";

function isComponent(cls: Class<any>) {
  if (Component) {
    /**
     * todo:11 Component有可能未定义，例如定义Target的时候
     * 需要配合coco-cli/src/build.ts appendExport函数一起修改
      */
    return (cls === Component) || getClsMetadata(cls, Component);
  } else {
    return false;
  }
}

type Initializer = (instance: any, ctx: Context) => void;

interface Option {
  optional?: true,
  initializer?: Initializer;
}

// 适用于装饰器不装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option?: { initializer?: Initializer }
): (userParam: UserParam) => Decorator;
// 适用于装饰器不装饰自己元数据类，且useParams是可选的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option: { optional: true, initializer?: Initializer }
): (userParam?: UserParam) => Decorator;
// 适用于装饰器装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option?: { initializer?: Initializer }
): (userParam: UserParam, decorateSelf?: true) => Decorator
// 适用于装饰器装饰自己元数据类，且useParams是可选的的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option: { optional: true, initializer?: Initializer }
): (userParam?: UserParam, decorateSelf?: true) => Decorator
function genDecorator<UserParam, C extends Context>(
  metadataClsOrName: MetadataClass | string,
  {initializer}: Option = {}
): (userParam: UserParam, decorateSelf?: true) => Decorator {
  const decoratorName = typeof metadataClsOrName === 'string'
    ? metadataClsOrName
    : lowercaseFirstLetter(metadataClsOrName.name);
  let metadataCls = typeof metadataClsOrName !== 'string'
    ? metadataClsOrName
    : null;
  if (typeof metadataClsOrName !== 'string') {
    associateClassMetadata(metadataClsOrName);
  }
  function decorator(userParam: UserParam, decorateSelf?: true) {
    if (__TEST__) {
      exec(decoratorName, userParam);
    }
    return function (value, context: C) {
      if (__TEST__) {
        apply(decoratorName, userParam);
      }
      switch (context.kind) {
        case KindClass:
          if (decorateSelf) {
            if (metadataCls === null) {
              metadataCls = value;
              associateClassMetadata(value, value, userParam);
            }
          } else {
            associateClassMetadata(value, metadataCls, userParam);
          }
          if (isComponent(metadataCls)) {
            addDefinition(<BeanName>userParam ?? lowercaseFirstLetter(context.name), value);
          }
          break;
        default:
          break;
      }
      context.addInitializer(function () {
        switch (context.kind) {
          case KindField:
            associateFieldMetadata(this.constructor, (<FieldContext>context).name, metadataCls, userParam);
            break;
          case KindMethod:
            associateFieldMetadata(this.constructor, (<MethodContext>context).name, metadataCls, userParam);
            break;
          default:
            return;
        }
        if (initializer) {
          initializer(this, context);
        }
      })
      return undefined;
    }
  }

  return decorator;
}

export default genDecorator;