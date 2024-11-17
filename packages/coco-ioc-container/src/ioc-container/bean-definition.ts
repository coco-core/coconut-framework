import { KindClass, KindField } from '../decorator/decorator-context.ts';
import { getFieldMetadata } from './metadata.ts';
import type ApplicationContext from './application-context.ts';
import type { Metadata } from 'coco-ioc-container';

/**
 * @param metada 元数据实例对象
 * @param appCtx 全局的applicationContext对象
 */
export type ClassPostConstructFn = () => void;
/**
 * @param metada 元数据实例对象
 * @param appCtx 全局的applicationContext对象
 * @param field 被装饰的字段名
 */
export type FieldPostConstructFn = (
  metadata: Metadata,
  appCtx: ApplicationContext,
  field: string
) => void;
export type PostConstructFn = ClassPostConstructFn | FieldPostConstructFn;

export interface ClassPostConstruct {
  kind: typeof KindClass;
  metadataCls: Class<any>;
  fn: ClassPostConstructFn;
}
export interface FieldPostConstruct {
  kind: typeof KindField;
  metadataCls: Class<any>;
  fn: FieldPostConstructFn;
  field: string;
}
export type PostConstruct = ClassPostConstruct | FieldPostConstruct;

export default class BeanDefinition<T> {
  name: string | Symbol;

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
  field: string
): FieldPostConstruct {
  return { kind: KindField, metadataCls, fn, field };
}

export function createBean(
  beanDefinition: BeanDefinition<any>,
  appCtx: ApplicationContext
) {
  const cls = beanDefinition.cls;
  const bean = new cls();
  for (const pc of beanDefinition.postConstruct) {
    switch (pc.kind) {
      case KindClass:
        pc.fn.call(bean);
        break;
      case KindField:
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
  return bean;
}
