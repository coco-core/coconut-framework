import {Annotation} from "./export";
import type { ClassContext, FieldContext } from "@/annotation/export.ts";

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
