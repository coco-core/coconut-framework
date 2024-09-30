/**
 * 元数据和装饰器是1:1的关系
 * 正常来说，元数据对应的装饰器也不会用来自身的，但确实存在这种场景，
 * 而且因为装饰器只能作用在函数定义上，所以在genDecorator内部不方便实现，
 * 所以有此装饰器，用于实现这种场景
 */
import {ClassContext} from './decorator-context.ts';
import {Metadata} from "./export";
import genDecorator from './decorator.ts'

export class Self extends Metadata{
  value: any

  postConstructor(arg: any) {
    this.value = arg;
  }
}

export default genDecorator<any, ClassContext>(Self)
