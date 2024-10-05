/**
 * 视图层注解
 */
import {ClassContext, Metadata, genDecorator, component, target, Target} from "coco-ioc-container";
import scope, { Scope } from "./scope.ts";


@target([Target.Type.Class])
@scope(Scope.Type.Prototype)
@component()
export class View extends Metadata{}

export default genDecorator<string, ClassContext>(View, { optional: true });