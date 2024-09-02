/**
 * ioc组件
 * 只有ioc组件才能实例化，所以view等注解都需要继承Component类
 */
import Annotation from "./abs-annotation";
import {genDecorator} from "./export.ts";
import target, {TargetType} from "../annotation/target.ts";

@target(TargetType.Class)
export class Component extends Annotation{}

export default genDecorator<void>(Component)