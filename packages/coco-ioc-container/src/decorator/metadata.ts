/**
 * 元信息基类
 */
export default abstract class Metadata {
  /**
   * value属性是元数据类默认保存的prop key
   * 使用装饰器时，如果第一个参数不是对象，而是基础数据类型或数组，那么会默认直接赋值给value属性。
   * 例如：
   * @person('张三')
   * 对应的元数据：
   * {
   *   value: '张三'
   * }
   * 如果需要给value赋值纯对象，或者赋值给其他prop，则通过传对象实现。
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
  value?: any;
}

export type MetadataClass = Class<Metadata> & {};
