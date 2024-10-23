import {addDefinition, addPostConstructor} from "./bean-factory.ts";
import {BeanName, Component} from "../decorator/component.ts";
import {lowercaseFirstLetter} from "../share/util.ts";
import {getAllMetadata, getClsMetadata} from "./metadata.ts";
import { get, clear } from "./application-context-start-helper.ts"
import {ClassPostConstructFn, genClassPostConstruct} from "./bean-definition.ts";
import type Metadata from "../decorator/metadata.ts";


class ApplicationContext {

  constructor() {
    this.addClsPostConstruct();
  }

  private isComponent(metadata: Metadata[]) {
    return metadata.find(meta => {
      // todo 获取构造函数能不能写得好看一点
      const Meta = meta.constructor;
      return (Meta === Component) || getClsMetadata(Meta, Component);
    })
  }
  private addClsPostConstruct() {
    const metadata = getAllMetadata()[1];
    for (const [cls, {name, fn}] of get().entries()) {
      if (metadata.has(cls) && this.isComponent(metadata.get(cls).classMetadata)) {
        addDefinition(name, cls);
        if (fn) {
          addPostConstructor(cls, genClassPostConstruct(fn as ClassPostConstructFn));
        }
      }
    }

    // 释放引用
    clear();
  }
}

export default ApplicationContext;
