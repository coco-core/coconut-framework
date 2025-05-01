import type { MetadataClass } from '../metadata/metadata.ts';
import {
  Context,
  Decorator,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import { get, NAME } from 'shared';
import { lowercaseFirstLetter, once } from '../share/util.ts';
import type { PostConstructFn } from '../ioc-container/ioc-component-definition.ts';
import { addDecoratorParams } from '../ioc-container/decorator-params.ts';

interface Option {
  optional?: true;
  // 如果装饰器刚好装饰了ioc组件，那么在实例化后立刻被调用
  postConstruct?: PostConstructFn;
}

// 适用于装饰器不装饰自己元数据类，且useParams是必填的场景
function createDecoratorExp<UserParam, C extends Context>(
  metadataCls: Class<any>,
  option?: { postConstruct?: PostConstructFn }
): (userParam: UserParam) => Decorator<C>;
// 适用于装饰器不装饰自己元数据类，且useParams是可选的场景
function createDecoratorExp<UserParam, C extends Context>(
  metadataCls: Class<any>,
  option: { optional: true; postConstruct?: PostConstructFn }
): (userParam?: UserParam) => Decorator<C>;
function createDecoratorExp<UserParam, C extends Context>(
  metadataCls: Class<any>,
  option: Option = {}
): (userParam: UserParam) => Decorator<C> {
  return doCreateDecoratorExp(metadataCls, option);
}
// 适用于装饰器装饰自己元数据类，且useParams是必填的场景
function createDecoratorExpByName<UserParam, C extends Context>(
  decoratorName: string,
  option?: { postConstruct?: PostConstructFn }
): (userParam: UserParam, decorateSelf?: true) => Decorator<C>;
// 适用于装饰器装饰自己元数据类，且useParams是可选的的场景
function createDecoratorExpByName<UserParam, C extends Context>(
  decoratorName: string,
  option: { optional: true; postConstruct?: PostConstructFn }
): (userParam?: UserParam, decorateSelf?: true) => Decorator<C>;
function createDecoratorExpByName<UserParam, C extends Context>(
  decoratorName: string,
  option: Option = {}
): (userParam: UserParam, decorateSelf?: true) => Decorator<C> {
  return doCreateDecoratorExp(decoratorName, option);
}
function doCreateDecoratorExp<UserParam, C extends Context>(
  metadataClsOrName: Class<any> | string,
  { postConstruct }: Option = {}
): (userParam: UserParam, decorateSelf?: true) => Decorator<C> {
  const decoratorName =
    typeof metadataClsOrName === 'string'
      ? metadataClsOrName
      : lowercaseFirstLetter(metadataClsOrName.name);
  let metadataCls =
    typeof metadataClsOrName !== 'string' ? metadataClsOrName : null;
  function decoratorExpress(userParam: UserParam, decorateSelf?: true) {
    if (__TEST__) {
      get(NAME.exec)?.(decoratorName, userParam);
    }
    return function (value, context: C) {
      if (__TEST__) {
        get(NAME.apply)?.(decoratorName, userParam);
      }
      switch (context.kind) {
        case KindClass:
          if (decorateSelf) {
            if (metadataCls === null) {
              metadataCls = value;
              addDecoratorParams(value, {
                decoratorName,
                metadataKind: KindClass,
                metadataClass: value,
                metadataParam: userParam,
                postConstruct,
              });
            }
          } else {
            addDecoratorParams(value, {
              decoratorName,
              metadataKind: KindClass,
              metadataClass: metadataCls,
              metadataParam: userParam,
              postConstruct,
            });
          }
          break;
        case KindMethod:
        case KindField:
        default:
          // ignore
          break;
      }
      const initializerOnce = once(function initializer() {
        switch (context.kind) {
          case KindField:
          case KindMethod:
            addDecoratorParams(this.constructor, {
              decoratorName,
              metadataKind: context.kind,
              metadataClass: metadataCls,
              metadataParam: userParam,
              field: context.name as string,
              postConstruct,
            });
            break;
          case KindClass:
            // ignore
            break;
        }
      });
      context.addInitializer(function () {
        initializerOnce(this);
      });
      return undefined;
    };
  }

  return decoratorExpress;
}

export { createDecoratorExp, createDecoratorExpByName };
