export * from './decorator-context.ts';

import {default as Annotation} from './abs-annotation';
import {default as component, Component} from './component';
import {default as scope, Scope, ScopeType} from './scope';
import {default as target, Target} from './target';
import genDecorator from "./decorator.ts";

export {
  Annotation,
  component,
  Component,
  target,
  Target,
  scope,
  Scope,
  ScopeType,
  genDecorator,
}