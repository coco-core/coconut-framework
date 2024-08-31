export interface ClassContext {
  kind: 'class';
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}

export interface FieldContext {
  kind: 'field';
  name: string | symbol;
  access: { get(): unknown; set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}

import {default as Annotation} from './abs-annotation';
import {default as component, Component} from './component';
import {default as scope, Scope, ScopeType} from './scope';
import {default as target, Target} from './target';

export {
  Annotation,
  component,
  Component,
  target,
  Target,
  scope,
  Scope,
  ScopeType,
}