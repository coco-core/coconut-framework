import {
  Context,
  Decorator,
  KindClass,
  KindField,
  KindMethod,
  KindGetter,
  KindSetter,
  KindAccessor,
} from './decorator-context.ts';
import { get, NAME } from 'shared';
import { lowercaseFirstLetter, once } from '../share/util.ts';
import type { PostConstructFn } from './ioc-component-definition.ts';
import { addDecoratorParams } from './decorator-params.ts';

interface Option {
  optional?: true;
  // 实例化组件后立刻执行
  postConstruct?: PostConstructFn;
}

function createDecoratorExpFactory(fn: any) {
  return function <UserParam, C extends Context>(
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
          // @ts-ignore
          case KindGetter:
          // @ts-ignore
          case KindSetter:
          // @ts-ignore
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
  if (
    typeof metadataCls !== 'function' ||
    !metadataCls.toString().includes('class')
  ) {
    throw new Error('createDecoratorExp的第一个参数类型是类');
  }
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
