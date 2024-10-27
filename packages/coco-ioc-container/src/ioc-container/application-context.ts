import {addDefinition, addPostConstruct} from "./bean-factory.ts";
import {Component} from "../decorator/component.ts";
import {getAllMetadata, getClsMetadata} from "./metadata.ts";
import { get, clear } from "./application-context-start-helper-post-construct.ts"
import {ClassPostConstructFn, genClassPostConstruct} from "./bean-definition.ts";
import type Metadata from "../decorator/metadata.ts";


class ApplicationContext {

  constructor() {
    this.initClassPostConstruct();
  }

  private isComponent(metadata: Metadata[]) {
    return metadata.find(meta => {
      // todo 获取构造函数能不能写得好看一点
      const Meta = meta.constructor;
      return (Meta === Component) || getClsMetadata(Meta, Component);
    })
  }
  private initClassPostConstruct() {
    const metadata = getAllMetadata()[1];
    for (const [cls, {name, fn}] of get().entries()) {
      if (metadata.has(cls) && this.isComponent(metadata.get(cls).classMetadata)) {
        addDefinition(name, cls);
        if (fn) {
          addPostConstruct(cls, genClassPostConstruct(fn as ClassPostConstructFn));
        }
      }
    }

    // 释放引用
    clear();
  }
}

export default ApplicationContext;
