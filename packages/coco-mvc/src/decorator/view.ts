/**
 * 视图层注解
 */
import {ClassContext, Metadata, genDecorator, component} from "coco-ioc-container";
import scope, { Scope } from "./scope.ts";


@scope(Scope.Type.Prototype)
@component()
export class View extends Metadata{}

export default genDecorator<string | void, ClassContext>(View);