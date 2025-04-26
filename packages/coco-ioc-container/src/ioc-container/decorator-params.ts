import type { PostConstructFn } from './ioc-component-definition.ts';
import {
  type Field,
  type Kind,
  KindClass,
  KindField,
} from '../decorator/decorator-context.ts';
import Metadata from '../metadata/metadata.ts';

type params = {
  decoratorName?: string;
  metadataKind: Kind;
  metadataClass: Class<any>;
  metadataParam: any;
  /**
   * 如果metadataKind是'class'，field是undefined
   * 如果metadataKind是'method'\'field'，field就是对应的prop名字
   * todo 测试是否支持Symbol类型
   */
  field?: Field;
  postConstruct?: PostConstructFn;
};
const decoratorParamMap: Map<Class<any>, params[]> = new Map();

/**
 * 保存装饰器参数
 * @param beDecoratedCls 被装饰的类
 * @param params
 */
export function addDecoratorParams(beDecoratedCls: Class<any>, params: params) {
  if (!beDecoratedCls) {
    console.error('错误的装饰目标类', beDecoratedCls);
    return;
  }

  if (!decoratorParamMap.has(beDecoratedCls)) {
    decoratorParamMap.set(beDecoratedCls, []);
  }
  const paramsList = decoratorParamMap.get(beDecoratedCls);
  paramsList.push(params);
}

/**
 * 查看被装饰类的是否包含了某元类
 * @param beDecoratedCls
 * @param targetMetadataCls
 * @param level
 */
export function getClassAndClasClassDecorator(
  beDecoratedCls: Class<any>,
  targetMetadataCls: Class<any>,
  level: number
): boolean {
  if (level <= 0) {
    return false;
  }

  const allDecoratorParams = decoratorParamMap.get(beDecoratedCls);
  if (!allDecoratorParams) {
    return false;
  }
  // 找到所有类装饰器
  const classDecoratorParams = allDecoratorParams.filter(
    (i) => i.metadataKind === KindClass
  );
  const find = classDecoratorParams.find(
    (params) => params.metadataClass === targetMetadataCls
  );
  if (find) {
    return true;
  }
  // 继续向上一层查找
  for (const classDecoratorParam of classDecoratorParams) {
    const find = getClassAndClasClassDecorator(
      classDecoratorParam.metadataClass,
      targetMetadataCls,
      level - 1
    );
    if (find) {
      return true;
    }
  }
  return false;
}

/**
 * 返回指定字段的装饰器参数，返回装饰器参数数组
 * @param Cls 指定组件
 * @param field 指定字段
 * @param decoratorCls 装饰器类，如果传入此参数，则查找字段的所有装饰器，能找到就返回1个元素的数组，没有找到就返回空数组；如果没有传入参数，则返回field所有的装饰器参数
 */
export function getFieldDecorator(
  Cls: Class<any>,
  field: string,
  decoratorCls?: Class<any>
) {
  const fieldDecorators = (decoratorParamMap.get(Cls) || []).filter(
    (i) => i.metadataKind === KindField && i.field === field
  );
  if (decoratorCls) {
    return fieldDecorators.filter((i) => i.metadataClass === decoratorCls);
  } else {
    return fieldDecorators;
  }
}

export function get() {
  return decoratorParamMap;
}

export function clear() {
  decoratorParamMap.clear();
}
