import {
  type Field,
  KindClass,
  KindField,
  KindMethod,
} from '../decorator/decorator-context.ts';
import { getClassMetadata, getFieldMetadata } from './metadata.ts';
import type ApplicationContext from './application-context.ts';
import type { Metadata } from 'coco-ioc-container';

/**
 * @param metada 元数据实例对象
 * @param appCtx 全局的applicationContext对象
 */
export type ClassPostConstructFn = (
  metadata: Metadata,
  appCtx: ApplicationContext
) => void;
/**
 * @param metada 元数据实例对象
 * @param appCtx 全局的applicationContext对象
 * @param field 被装饰的字段名
 */
export type FieldPostConstructFn = (
  metadata: Metadata,
  appCtx: ApplicationContext,
  field: Field
) => void;
export type MethodPostConstructFn = (
  metadata: Metadata,
  appCtx: ApplicationContext,
  field: Field
) => void;
export type PostConstructFn =
  | ClassPostConstructFn
  | FieldPostConstructFn
  | MethodPostConstructFn;

export interface ClassPostConstruct {
  kind: typeof KindClass;
  metadataCls: Class<any>;
  fn: ClassPostConstructFn;
}

export interface FieldPostConstruct {
  kind: typeof KindField;
  metadataCls: Class<any>;
  fn: FieldPostConstructFn;
  field: Field;
}

export interface MethodPostConstruct {
  kind: typeof KindMethod;
  metadataCls: Class<any>;
  fn: MethodPostConstructFn;
  field: Field;
}

export type PostConstruct =
  | ClassPostConstruct
  | FieldPostConstruct
  | MethodPostConstruct;

export default class BeanDefinition<T> {
  name: Field;

  cls: Class<T>;

  /**
   * 自定义初始化方法
   * new表达式后立刻执行
   */
  postConstruct?: PostConstruct[];
}

export function genClassPostConstruct(
  metadataCls: Class<any>,
  fn: ClassPostConstructFn
): ClassPostConstruct {
  return { kind: KindClass, metadataCls, fn };
}

export function genFieldPostConstruct(
  metadataCls: Class<any>,
  fn: FieldPostConstructFn,
  field: Field
): FieldPostConstruct {
  return { kind: KindField, metadataCls, fn, field };
}

export function genMethodPostConstruct(
  metadataCls: Class<any>,
  fn: MethodPostConstructFn,
  field: Field
): MethodPostConstruct {
  return { kind: KindMethod, metadataCls, fn, field };
}

export function createBean(
  beanDefinition: BeanDefinition<any>,
  appCtx: ApplicationContext,
  ...parameters: any[]
) {
  const cls = beanDefinition.cls;
  const bean = new cls();
  // todo 不要写死instantiate
  bean.instantiate?.(...parameters);
  for (const pc of beanDefinition.postConstruct) {
    switch (pc.kind) {
      case KindClass: {
        const metadata = getClassMetadata(cls, pc.metadataCls);
        if (metadata.length === 1) {
          pc.fn.call(bean, metadata[0], appCtx);
        } else {
          if (__TEST__) {
            console.error('元数据应该只有一个', cls, pc.metadataCls);
          }
        }
        break;
      }
      case KindField:
      case KindMethod: {
        const metadata = getFieldMetadata(cls, pc.field, pc.metadataCls);
        if (metadata.length === 1) {
          pc.fn.call(bean, metadata[0], appCtx, pc.field);
        } else {
          if (__TEST__) {
            console.error('元数据应该只有一个', cls, pc.metadataCls, pc.field);
          }
        }
        break;
      }
    }
  }
  return bean;
}
