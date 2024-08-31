import {addClsAnnotation} from "../ioc-container/export";
import {Annotation} from "./export";
import type { ClassContext } from "@/annotation/export.ts";

export enum ScopeType {
  Singleton = 0,
  Prototype = 1
}

export class Scope extends Annotation {
  value: ScopeType;

  constructor(value: ScopeType) {
    super();
    this.value = value;
  }
}

export default function scope(type: ScopeType = ScopeType.Prototype) {
  return function (value, {kind}: ClassContext) {
    if (kind === "class") {
      addClsAnnotation(value, Scope, type);
    }
    return undefined;
  }
}
