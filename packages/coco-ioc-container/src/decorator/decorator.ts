import {Context, Decorator, KindClass, KindField, Target,} from "../decorator/export.ts";
import {addClassMetadata, addFieldMetadata, getClsMetadata,} from "../ioc-container/metadata-runtime-config.ts";
import {MetadataClass} from "../decorator/metadata.ts";
import {FieldContext} from "../decorator/decorator-context.ts";
import {addDefinition} from "../ioc-container/bean-factory.ts";
import {Component} from "./component.ts";
import type {BeanName} from "./component.ts";
import {exec, apply} from "../_test_helper/decorator.ts";
import {lowercaseFirstLetter} from "../share/util.ts";

/**
 * 适用于装饰器不装饰自己元数据类的场景
 * @param metadataCls
 */
function genDecorator<UserParam, C extends Context>(metadataCls: MetadataClass):
  (userParam: UserParam) => Decorator;
/**
 * 适用于装饰器装饰自己元数据类的场景
 * @param metadataClsName 元信息类的名字，具体元数据类在装饰器装饰自己的时候设置
 */
function genDecorator<UserParam, C extends Context>(metadataClsName: string):
  // 在装饰自己的时候需要置第二个参数为true
  (userParam: UserParam, decorateSelf?: true) => Decorator
function genDecorator<UserParam, C extends Context>(
  metadataClsOrName: MetadataClass | string,
): (userParam: UserParam, decorateSelf?: true) => Decorator {
  const decoratorName = typeof metadataClsOrName === 'string'
    ? metadataClsOrName
    : lowercaseFirstLetter(metadataClsOrName.name);
  let metadataCls = typeof metadataClsOrName !== 'string'
    ? metadataClsOrName
    : null;

  function decorator(userParam: UserParam, decorateSelf?: true) {
    if (__TEST__) { exec(decoratorName, userParam); }
    return function (value, context: C) {
      if (__TEST__) { apply(decoratorName, userParam); }
      switch (context.kind) {
        case KindClass:
          if (decorateSelf) {
            if (metadataCls === null) {
              metadataCls = value;
              addClassMetadata(value, value, userParam);
            }
          } else {
            addClassMetadata(value, metadataCls, userParam);
          }
          if (metadataCls === Component) {
            addDefinition(<BeanName>userParam ?? lowercaseFirstLetter(context.name), value);
          }
          break;
        default:
          break;
      }
      context.addInitializer(function () {
        switch (context.kind) {
          case KindField:
            addFieldMetadata(this.constructor, (<FieldContext>context).name, metadataCls, userParam);
            break;
          default:
            return;
        }
      })
      return undefined;
    }
  }

  return decorator;
}

export default genDecorator;