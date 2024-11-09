import { addDefinition, addPostConstruct, getBean } from './bean-factory.ts';
import { Component } from '../decorator/component.ts';
import {
  addClassMetadata,
  addFieldMethodMetadata,
  getAllMetadata,
} from './metadata.ts';
import {
  get,
  clear,
  getClassAndClasClassDecorator,
  recordDecoratorParams,
} from './decorator-params.ts';
import {
  ClassPostConstructFn,
  genClassPostConstruct,
  genFieldPostConstruct,
} from './bean-definition.ts';
import Metadata from '../decorator/metadata.ts';
import {
  KindClass,
  KindField,
  KindMethod,
} from '../decorator/decorator-context.ts';
import { Bean } from '../decorator/bean.ts';
import { Scope } from '../decorator/scope.ts';

class ApplicationContext {
  constructor() {
    this.recordFieldOrMethodDecoratorParams();
    this.recordDecoratedByAtBean();
    this.buildMetadata();
    this.buildBeanDefinition();
  }
  public getBean<T>(cls: Class<T>): T;
  public getBean<T>(name: string): T;
  public getBean<T>(nameOrCls: Class<T> | string): T {
    return getBean(nameOrCls);
  }

  /**
   * 实例化所有业务类（非元数据类），拿到field和method装饰器对应的参数
   * @private
   */
  private recordFieldOrMethodDecoratorParams() {
    for (const Cls of get().keys()) {
      if (Object.getPrototypeOf(Cls) !== Metadata) {
        new Cls();
      }
    }
  }

  // 根据装饰器的参数，构建对应的元数据实例
  private buildMetadata() {
    for (const [beDecoratedCls, list] of get().entries()) {
      for (const { metadataKind, metadataClass, metadataParam, name } of list) {
        switch (metadataKind) {
          case KindClass:
            addClassMetadata(beDecoratedCls, metadataClass, metadataParam);
            break;
          case KindField:
          case KindMethod:
            addFieldMethodMetadata(
              beDecoratedCls,
              name,
              metadataClass,
              metadataParam
            );
            break;
        }
      }
    }
  }

  private hasComponentDecorator(beDecoratedCls: Class<any>) {
    const list = getClassAndClasClassDecorator(beDecoratedCls);
    return list.some(({ metadataClass, metadataMetadataClassList }) => {
      return (
        metadataClass === Component ||
        metadataMetadataClassList.find((i) => i === Component)
      );
    });
  }

  private buildBeanDefinition() {
    const metadata = getAllMetadata()[1];
    // 处理@component和带有@component的元数据类
    for (const [beDecoratedCls, params] of get().entries()) {
      if (metadata.has(beDecoratedCls)) {
        const needAddDefinition = this.hasComponentDecorator(beDecoratedCls);
        if (needAddDefinition) {
          const name = params.find((i) => i.metadataKind === KindClass).name;
          addDefinition(name, beDecoratedCls);
          params.forEach(({ metadataKind, postConstruct, name }) => {
            if (postConstruct) {
              switch (metadataKind) {
                case KindClass:
                  addPostConstruct(
                    beDecoratedCls,
                    genClassPostConstruct(postConstruct as ClassPostConstructFn)
                  );
                  break;
                case KindField:
                case KindMethod:
                  addPostConstruct(
                    beDecoratedCls,
                    genFieldPostConstruct(postConstruct, name)
                  );
                  break;
              }
            }
          });
        }
      }
    }

    // 释放引用
    clear();
  }

  // 记录@bean的装饰器的类
  private recordDecoratedByAtBean() {
    // 处理@bean
    for (const [beDecoratedCls, params] of get().entries()) {
      const param = params.find(
        (i) => i.metadataKind === KindMethod && i.metadataClass === Bean
      );
      if (param) {
        // todo 11 配置scope和component参数
        recordDecoratorParams(param.metadataParam, {
          metadataKind: KindClass,
          metadataClass: Scope,
          metadataParam: undefined,
          name: param.name,
        });
        recordDecoratorParams(param.metadataParam, {
          metadataKind: KindClass,
          metadataClass: Component,
          metadataParam: undefined,
          name: param.name,
        });
      }
    }
  }
}

export default ApplicationContext;
