/**
 * 元信息基类
 */
import {Class} from "../ioc-container/export.ts";
export default abstract class Metadata {
  /**
   * 接受从装饰器拿到的用户入参，自定义设置元信息属性
   * 在new XxxAnnotation()执行之后立刻被调用
   * @param args 装饰器的参数
   * @param target 被装饰的类定义
   */
  postConstructor?(args?: any, target?: Class<any>) {}
}

export type MetadataClass = Class<Metadata> & {}
