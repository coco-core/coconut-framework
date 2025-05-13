import {
  type Field,
  KindClass,
  KindField,
  KindMethod,
} from './decorator-context.ts';
import { listClassMetadata, listFieldMetadata } from './metadata.ts';
import type ApplicationContext from './application-context.ts';
import type Metadata from '../metadata/abstract/metadata.ts';

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

export default class IocComponentDefinition<T> {
  id: string;

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

export function createComponent(
  appCtx: ApplicationContext,
  componentDefinition: IocComponentDefinition<any>,
  ...parameters: any[]
) {
  const cls = componentDefinition.cls;
  const component = new cls(...parameters);
  for (const pc of componentDefinition.postConstruct) {
    switch (pc.kind) {
      case KindClass: {
        const metadata = listClassMetadata(cls, pc.metadataCls);
        if (metadata.length === 1) {
          pc.fn.call(component, metadata[0], appCtx);
        } else {
          if (__TEST__) {
            console.error('元数据应该只有一个', cls, pc.metadataCls);
          }
        }
        break;
      }
      case KindField:
      case KindMethod: {
        const metadata = listFieldMetadata(cls, pc.field, pc.metadataCls);
        if (metadata.length === 1) {
          pc.fn.call(component, metadata[0], appCtx, pc.field);
        } else {
          if (__TEST__) {
            console.error('元数据应该只有一个', cls, pc.metadataCls, pc.field);
          }
        }
        break;
      }
    }
  }
  return component;
}
