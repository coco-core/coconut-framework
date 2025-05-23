import {
  type Context,
  type Decorator,
  KindClass,
  KindField,
  KindMethod,
  KindGetter,
  KindSetter,
  KindAccessor,
} from './decorator-context.ts';
export type { Decorator };
import { get, NAME } from 'shared';
import { isClass, lowercaseFirstLetter, once } from '../share/util.ts';
import type { PostConstructFn } from './ioc-component-definition.ts';
import { addDecoratorParams } from './decorator-params.ts';

/**
 * @public
 */
export interface Option {
  // 实例化组件后立刻执行
  postConstruct?: PostConstructFn;
}

function createDecoratorExpFactory(fn: any) {
  return function <UserParam, C extends Context>(
    metadataClsOrName: Class<any> | string,
    { postConstruct }: Option = {}
  ): (userParam?: UserParam, decorateSelf?: true) => Decorator<C> {
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
                fn(value, {
                  decoratorName,
                  metadataKind: KindClass,
                  metadataClass: value,
                  metadataParam: userParam,
                  postConstruct,
                });
              }
            } else {
              fn(value, {
                decoratorName,
                metadataKind: KindClass,
                metadataClass: metadataCls,
                metadataParam: userParam,
                postConstruct,
              });
            }
            break;
          case KindGetter:
          case KindSetter:
          case KindAccessor:
            throw new Error(`暂不支持装饰${context.kind}类型。`);
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
              fn(this.constructor, {
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
  };
}

const doCreateDecoratorExp = createDecoratorExpFactory(addDecoratorParams);

/**
 * 使用元数据类创建一个装饰器函数
 * 适用于装饰器不装饰自己元数据类的场景
 * @public
 */
function createDecoratorExp(
  metadataCls: Class<any>,
  option: Option = {}
): (userParam?: any) => Decorator<DecoratorContext> {
  if (!isClass(metadataCls)) {
    throw new Error('createDecoratorExp的第一个参数类型是类');
  }
  return doCreateDecoratorExp(metadataCls, option);
}

/**
 * 使用装饰器名字创建一个装饰器函数
 * 适用于装饰器装饰自己元数据类的场景
 * @public
 */
function createDecoratorExpByName(
  decoratorName: string,
  option: Option = {}
): (userParam?: any, decorateSelf?: true) => Decorator<DecoratorContext> {
  if (typeof decoratorName !== 'string') {
    throw new Error(
      'createDecoratorExpByName的第一个参数类型是字符串，表示装饰器的名字'
    );
  }
  return doCreateDecoratorExp(decoratorName, option);
}

export {
  createDecoratorExp,
  createDecoratorExpByName,
  createDecoratorExpFactory,
};
