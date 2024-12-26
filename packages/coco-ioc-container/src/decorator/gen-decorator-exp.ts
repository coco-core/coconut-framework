import type { MetadataClass } from './metadata.ts';
import {
  Context,
  Decorator,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import { get, NAME } from 'shared';
import { lowercaseFirstLetter, once } from '../share/util.ts';
import { PostConstructFn } from '../ioc-container/bean-definition.ts';
import { recordDecoratorParams } from '../ioc-container/decorator-params.ts';

interface Option {
  optional?: true;
  // 初始化装饰器
  init?: Function;
  // 如果装饰器刚好装饰了ioc组件，那么在实例化后立刻被调用
  postConstruct?: PostConstructFn;
}

// 适用于装饰器不装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option?: { postConstruct?: PostConstructFn; init?: Function }
): (userParam: UserParam) => Decorator<C>;
// 适用于装饰器不装饰自己元数据类，且useParams是可选的场景
function genDecorator<UserParam, C extends Context>(
  metadataCls: MetadataClass,
  option: { optional: true; postConstruct?: PostConstructFn; init?: Function }
): (userParam?: UserParam) => Decorator<C>;
// 适用于装饰器装饰自己元数据类，且useParams是必填的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option?: { postConstruct?: PostConstructFn; init?: Function }
): (userParam: UserParam, decorateSelf?: true) => Decorator<C>;
// 适用于装饰器装饰自己元数据类，且useParams是可选的的场景
function genDecorator<UserParam, C extends Context>(
  metadataClsName: string,
  option: { optional: true; postConstruct?: PostConstructFn; init?: Function }
): (userParam?: UserParam, decorateSelf?: true) => Decorator<C>;
function genDecorator<UserParam, C extends Context>(
  metadataClsOrName: MetadataClass | string,
  { postConstruct, init }: Option = {}
): (userParam: UserParam, decorateSelf?: true) => Decorator<C> {
  const decoratorName =
    typeof metadataClsOrName === 'string'
      ? metadataClsOrName
      : lowercaseFirstLetter(metadataClsOrName.name);
  let metadataCls =
    typeof metadataClsOrName !== 'string' ? metadataClsOrName : null;

  function decorator(userParam: UserParam, decorateSelf?: true) {
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
              recordDecoratorParams(value, {
                metadataKind: KindClass,
                metadataClass: value,
                metadataParam: userParam,
                name: lowercaseFirstLetter(context.name),
                init,
                postConstruct,
              });
            }
          } else {
            recordDecoratorParams(value, {
              metadataKind: KindClass,
              metadataClass: metadataCls,
              metadataParam: userParam,
              name: lowercaseFirstLetter(context.name),
              init,
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
            recordDecoratorParams(this.constructor, {
              metadataKind: context.kind,
              metadataClass: metadataCls,
              metadataParam: userParam,
              name: context.name,
              init,
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

  return decorator;
}

export default genDecorator;
