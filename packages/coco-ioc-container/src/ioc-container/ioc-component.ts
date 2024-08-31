/**
 * ioc组件基类
 */
export default abstract class IocComponent<T> {
  // 名字
  name: string;

  // 实例化
  abstract newInstance(params: any): T
}