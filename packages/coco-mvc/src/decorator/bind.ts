/**
 * 将类方法绑定到类实例上
 */
import {Metadata, target, Target, genDecorator} from "coco-ioc-container";

@target([Target.Type.Method])
export class Bind extends Metadata{}

function postConstruct(name: string) {
  this[name] = this[name].bind(this);
}

export default genDecorator(Bind, { postConstruct })
