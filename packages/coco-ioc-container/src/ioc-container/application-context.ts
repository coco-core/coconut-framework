import {addDefinition, addPostConstruct} from "./bean-factory.ts";
import {Component} from "../decorator/component.ts";
import {getAllMetadata, getClsMetadata} from "./metadata.ts";
import { get, clear } from "./application-context-start-helper-post-construct.ts"
import {ClassPostConstructFn, genClassPostConstruct} from "./bean-definition.ts";
import type Metadata from "../decorator/metadata.ts";
import {constructOf} from "../share/util.ts";


class ApplicationContext {

  constructor() {
    this.initClassDefinitionPostConstruct();
  }

  private isComponent(metadata: Metadata[]) {
    return metadata.find(meta => {
      const Meta = constructOf<any>(meta);
      return (Meta === Component) || getClsMetadata(Meta, Component);
    })
  }

  /**
   * 类装饰对应的postConstruct已经收集到了，首先初始化beanDefinition中的PostConstruct里面去。
   */
  private initClassDefinitionPostConstruct() {
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
