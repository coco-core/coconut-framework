import {
  associateClassMetadata,
  associateFieldMetadata,
} from "../ioc-container/metadata.ts";
import type {MetadataClass} from "./metadata.ts";
import {tempAddClsPostConstruct} from "../ioc-container/application-context-start-helper.ts";
import {
  Context,
  Decorator,
  FieldContext,
  KindClass,
  KindField,
  KindMethod,
} from "./decorator-context.ts";
import type {MethodContext} from "./decorator-context.ts";
import {addPostConstructor} from "../ioc-container/bean-factory.ts";
import type {BeanName} from "./component.ts";
import {apply, exec} from "../_test_helper/decorator.ts";
import {lowercaseFirstLetter} from "../share/util.ts";
import {
  genFieldPostConstruct,
  PostConstructFn
} from "../ioc-container/bean-definition.ts";

interface Option {
  optional?: true,
  postConstructor?: PostConstructFn;
}

// 适用于装饰器不装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option?: { postConstructor?: PostConstructFn }
): (userParam: UserParam) => Decorator;
// 适用于装饰器不装饰自己元数据类，且useParams是可选的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option: { optional: true, postConstructor?: PostConstructFn }
): (userParam?: UserParam) => Decorator;
// 适用于装饰器装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option?: { postConstructor?: PostConstructFn }
): (userParam: UserParam, decorateSelf?: true) => Decorator
// 适用于装饰器装饰自己元数据类，且useParams是可选的的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option: { optional: true, postConstructor?: PostConstructFn }
): (userParam?: UserParam, decorateSelf?: true) => Decorator
function genDecorator<UserParam, C extends Context>(
  metadataClsOrName: MetadataClass | string,
  {postConstructor}: Option = {}
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
          tempAddClsPostConstruct(value, <BeanName>userParam ?? lowercaseFirstLetter(context.name), postConstructor)
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
        }
        if (postConstructor) {
          switch (context.kind) {
            case KindField:
              // todo 控制只能注册一次
              addPostConstructor(this.constructor, genFieldPostConstruct(postConstructor, context.name));
              break;
          }
        }
      })
      return undefined;
    }
  }

  return decorator;
}

export default genDecorator;