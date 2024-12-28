export const defaultProp = 'value';
/**
 * 元信息基类
 */
export default abstract class Metadata {
  /**
   * 使用装饰器第一个参数不是对象，而是基础数据类型或数组，这时候就是单属性赋值
   * 这时候如果元数据定义了属性，则取getOwnPropertyNames的第一个，否则默认赋值给value属性。
   * 例如：
   * 装饰器这样使用：@person('张三')
   ** 如果元数据定义如下：
   * class Person extends Metadata {
   *   name: string;
   * }
   * 则生成的元数据为：
   * {
   *   name: '张三'
   * }
   ** 如果元数据定义如下：
   * class Person extends Metadata {}
   * 则生成的元数据为：
   * {
   *   value: '张三'
   * }
   *
   * 使用装饰器第一个参数是对象，那么getOwnPropertyNames返回的所有prop，通过浅拷贝赋值
   * 例如：
   * @person({
   *   value: { name: '张三' },
   *   habit: ['打篮球', '打游戏']
   * })
   * 对应元数据
   * {
   *   value: { name: '张三' },
   *   habit: ['打篮球', '打游戏']
   * }
   */
}

export type MetadataClass = Class<Metadata>;
