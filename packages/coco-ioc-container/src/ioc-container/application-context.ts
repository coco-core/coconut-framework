import { addDefinition, addPostConstruct, getBean } from './bean-factory.ts';
import { Component } from '../decorator/component.ts';
import { getAllMetadata, getClsMetadata } from './metadata.ts';
import {
  get,
  clear,
} from './application-context-start-helper-post-construct.ts';
import {
  ClassPostConstructFn,
  genClassPostConstruct,
} from './bean-definition.ts';
import type Metadata from '../decorator/metadata.ts';
import { constructOf } from '../share/util.ts';

class ApplicationContext {
  constructor() {
    this.initClassDefinition();
  }
  public getBean<T>(cls: Class<T>): T;
  public getBean<T>(name: string): T;
  public getBean<T>(nameOrCls: Class<T> | string): T {
    return getBean(nameOrCls);
  }

  private isComponent(metadata: Metadata[]) {
    return metadata.find((meta) => {
      const Meta = constructOf<any>(meta);
      return Meta === Component || getClsMetadata(Meta, Component);
    });
  }

  private initClassDefinition() {
    const metadata = getAllMetadata()[1];
    for (const [cls, { name, fns }] of get().entries()) {
      if (
        metadata.has(cls) &&
        this.isComponent(metadata.get(cls).classMetadata)
      ) {
        addDefinition(name, cls);
        // todo 这里还需要递归检查fn对应的元信息是否有装饰器，如果有且装饰器也有postConstruct的话，也需要处理
        fns.forEach((fn) => {
          addPostConstruct(
            cls,
            genClassPostConstruct(fn as ClassPostConstructFn)
          );
        });
      }
    }

    // 释放引用
    clear();
  }
}

export default ApplicationContext;
