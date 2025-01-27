import { addDefinition, addPostConstruct, getBean } from './bean-factory.ts';
import {
  addClassMetadata,
  addFieldMethodMetadata,
  getAllMetadata,
  getByClassMetadata,
  getByFieldMetadata,
} from './metadata.ts';
import {
  get,
  clear as clearDecoratorParams,
  getClassAndClasClassDecorator,
  addDecoratorParams,
} from './decorator-params.ts';
import {
  ClassPostConstructFn,
  genClassPostConstruct,
  genFieldPostConstruct,
  genMethodPostConstruct,
} from './bean-definition.ts';
import Metadata from '../metadata/metadata.ts';
import {
  KindClass,
  KindField,
  KindMethod,
} from '../decorator/decorator-context.ts';
import Bean from '../metadata/bean.ts';
import Component from '../metadata/component.ts';
import type { Scope } from '../metadata/component.ts';
import { isPlainObject } from '../share/util.ts';
import Configuration from '../metadata/configuration.ts';
import { register, NAME } from 'shared';
import ConstructorParam, { ClassList } from '../metadata/constructor-param.ts';
import Init from '../metadata/init.ts';
import Start from '../metadata/start.ts';

class ApplicationContext {
  beanConfig: Record<string, any>;

  constructor(jsonConfig: Record<string, any> = {}) {
    this.beanConfig = jsonConfig;
    this.recordFieldOrMethodDecoratorParams();
    this.recordAtBeanDecoratorParams();
    // todo 参数校验
    this.buildMetadata();
    this.buildBeanDefinition();
    // 清空装饰器参数记录 todo 是否可以挪到this.buildBeanDefinition的上面
    clearDecoratorParams();
    // todo 想办法去掉NAME.applicationContext
    register(NAME.applicationContext, this);
    this.instantiateBeanRecursively();
    this.initBean();
    this.startBean();
  }
  public getBean<T>(Cls: Class<T>): T {
    return getBean(Cls, this);
  }

  public getByClassMetadata(metadataClass: Class<any>) {
    return getByClassMetadata(metadataClass);
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
      for (const {
        metadataKind,
        metadataClass,
        metadataParam,
        field,
      } of list) {
        switch (metadataKind) {
          case KindClass:
            addClassMetadata(beDecoratedCls, metadataClass, metadataParam);
            break;
          case KindField:
          case KindMethod:
            addFieldMethodMetadata(
              beDecoratedCls,
              field,
              metadataClass,
              metadataParam
            );
            break;
        }
      }
    }
  }

  /**
   * 被装饰类是否被特定元数据类装饰；或者被特定元数据类的复合元数据装饰
   * @param beDecoratedCls 被装饰的类
   * @param Target
   * @param ignoreMetadataCls 是否忽略元数据的类，即之查找业务元数据类
   * @private
   */
  private isDecoratedByOrCompoundDecorated(
    beDecoratedCls: Class<any>,
    Target: Class<any>,
    ignoreMetadataCls: boolean = true
  ) {
    const list = getClassAndClasClassDecorator(
      beDecoratedCls,
      ignoreMetadataCls
    );
    return list.some(({ metadataClass, metadataMetadataClassList }) => {
      return (
        metadataClass === Target ||
        metadataMetadataClassList.find((i) => i === Target)
      );
    });
  }

  private buildBeanDefinition() {
    const metadata = getAllMetadata()[1];
    // 处理@component和带有@component的元数据类
    for (const [beDecoratedCls, params] of get().entries()) {
      if (metadata.has(beDecoratedCls)) {
        if (this.isDecoratedByOrCompoundDecorated(beDecoratedCls, Component)) {
          addDefinition(beDecoratedCls);
          params.forEach(
            ({ metadataClass, metadataKind, postConstruct, field }) => {
              if (postConstruct) {
                switch (metadataKind) {
                  case KindClass:
                    addPostConstruct(
                      beDecoratedCls,
                      genClassPostConstruct(
                        metadataClass,
                        postConstruct as ClassPostConstructFn
                      )
                    );
                    break;
                  case KindField:
                    addPostConstruct(
                      beDecoratedCls,
                      genFieldPostConstruct(metadataClass, postConstruct, field)
                    );
                    break;
                  case KindMethod:
                    addPostConstruct(
                      beDecoratedCls,
                      genMethodPostConstruct(
                        metadataClass,
                        postConstruct,
                        field
                      )
                    );
                    break;
                }
              }
            }
          );
        }
      }
    }
  }

  // 为@bean对应的类添加装饰器参数
  private recordAtBeanDecoratorParams() {
    for (const [beDecoratedCls, params] of get().entries()) {
      if (
        !this.isDecoratedByOrCompoundDecorated(beDecoratedCls, Configuration)
      ) {
        continue;
      }
      const beanDecorateParams = params.filter(
        (i) => i.metadataKind === KindMethod && i.metadataClass === Bean
      );
      beanDecorateParams.forEach(function (param) {
        let targetCls: Class<any>;
        let scope: Scope;
        if (isPlainObject(param.metadataParam)) {
          targetCls = param.metadataParam.value;
          scope = param.metadataParam.scope;
        } else {
          targetCls = param.metadataParam;
        }
        addDecoratorParams(targetCls, {
          metadataKind: KindClass,
          metadataClass: Component,
          metadataParam: scope,
        });
      });
    }
  }

  private instantiateBeanRecursively() {
    const map = getByClassMetadata(ConstructorParam);

    function doInstantiateBean(beDecorated: Class<any>) {
      if (!map.has(beDecorated)) {
        return getBean(beDecorated, this);
      } else {
        const metadata = map.get(beDecorated) as { value: ClassList };
        const ParameterList = metadata.value;
        const parameterList = ParameterList.map(doInstantiateBean);
        return getBean(beDecorated, this, ...parameterList);
      }
    }

    for (const beDecorated of map.keys()) {
      doInstantiateBean(beDecorated);
    }
  }

  private initBean() {
    const map = getByFieldMetadata(Init);
    for (const [beDecoratedCls, { field, metadata }] of map.entries()) {
      const bean = getBean(beDecoratedCls, this);
      bean[field]?.(this);
    }
  }

  private startBean() {
    const map = getByFieldMetadata(Start);
    for (const [beDecoratedCls, { field, metadata }] of map.entries()) {
      const bean = getBean(beDecoratedCls, this);
      bean[field]?.();
    }
  }
}

export default ApplicationContext;
