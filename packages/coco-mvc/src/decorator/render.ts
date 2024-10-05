import {Metadata, target, Target, genDecorator} from "coco-ioc-container";

@target([Target.Type.Method, Target.Type.Field])
export class Render extends Metadata{}

export default genDecorator(Render, true);
