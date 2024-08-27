/**
 * ioc组件基类
 */
export default abstract class IocComponent<T> {
  // id 全局唯一
  id: string;

  // 名字
  name: string;

  // 实例化
  abstract newInstance(params: any): T
}