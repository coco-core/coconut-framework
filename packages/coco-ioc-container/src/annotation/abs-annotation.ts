/**
 * 注解类
 * 注解有自己不同的属性，对应使用时不同的参数，作为实例保存到容器中
 */
import {Class} from "../ioc-container/export.ts";
export default abstract class Annotation {
  /**
   * 接受从装饰器拿到的参数，来设置注解实例属性
   * 在new XxxAnnotation()执行之后立刻被调用
   * @param args 装饰器的参数
   * @param target 被装饰的类定义
   */
  postConstructor?(args?: any, target?: Class<any>) {}
}

export type AnnotationCls = Class<Annotation> & {}
