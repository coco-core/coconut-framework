import {Class} from "./export.ts";

export default class BeanDefinition<T> {
  name: string;

  cls: Class<T>

  /**
   * 自定义初始化方法
   * new表达式后立刻执行
   */
  postConstruct?: Function
}