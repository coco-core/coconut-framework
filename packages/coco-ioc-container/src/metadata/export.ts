export * from './decorator-context.ts';

import {default as Metadata} from './metadata';
import {default as component, Component} from './component';
import {default as scope, Scope, ScopeType} from './scope';
import {default as target, Target} from './target';
import {default as self, Self} from './self'
import genDecorator from "./decorator.ts";

export {
  Metadata,
  component,
  Component,
  target,
  Target,
  self,
  Self,
  scope,
  Scope,
  ScopeType,
  genDecorator,
}