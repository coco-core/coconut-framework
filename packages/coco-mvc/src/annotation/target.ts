import {registerClsAnnotation} from "../ioc-container/index";
import {Annotation} from "./index";

export enum TargetType {
  Class,
  Field,
  Method
}

export class Target extends Annotation{
  value: TargetType[]
}

// decorator
export default function target(value, { kind }: ClassContext | FieldContext) {
  return undefined;
}
