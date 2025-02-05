import {
  addDefinition,
  addPostConstruct,
  getComponent,
} from './bean-factory.ts';
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
import Component from '../metadata/component.ts';
import type { Scope } from '../metadata/component.ts';
import { isPlainObject, lowercaseFirstLetter } from '../share/util.ts';
import Configuration from '../metadata/configuration.ts';
import { register, NAME } from 'shared';
import ConstructorParam, { ClassList } from '../metadata/constructor-param.ts';
import Init from '../metadata/init.ts';
import Start from '../metadata/start.ts';
import Target from '../metadata/target.ts';

class ApplicationContext {
  beanConfig: Record<string, any>;

  constructor(jsonConfig: Record<string, any> = {}) {
    this.beanConfig = jsonConfig;
    {
      this.recordFieldOrMethodDecoratorParams();
      this.addAtComponentDecoratorParams();
      this.validateTarget();
      this.buildMetadata();
      this.buildBeanDefinition();
    }
    // 清空装饰器参数记录
    clearDecoratorParams();
    {
      // todo 想办法去掉NAME.applicationContext
      register(NAME.applicationContext, this);
    }
    {
      this.instantiateBeanRecursively();
      this.initBean();
      this.startBean();
    }
  }
  public getComponent<T>(Cls: Class<T>): T {
    return getComponent(Cls, this);
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
   * @param ignoreMetadataCls 是否忽略元数据的类，即只查找业务元数据类
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
    const bizMetadata = getAllMetadata()[1];
    // 处理@component和带有@component的元数据类
    for (const [beDecoratedCls, params] of get().entries()) {
      if (bizMetadata.has(beDecoratedCls)) {
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

  // 为@component添加装饰器参数
  private addAtComponentDecoratorParams() {
    for (const [beDecoratedCls, params] of get().entries()) {
      if (
        !this.isDecoratedByOrCompoundDecorated(beDecoratedCls, Configuration)
      ) {
        continue;
      }
      const beanDecorateParams = params.filter(
        (i) => i.metadataKind === KindMethod && i.metadataClass === Component
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
          decoratorName: lowercaseFirstLetter(Component.name),
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
        return getComponent(beDecorated, this);
      } else {
        const metadata = map.get(beDecorated) as { value: ClassList };
        const ParameterList = metadata.value;
        const parameterList = ParameterList.map(doInstantiateBean);
        return getComponent(beDecorated, this, ...parameterList);
      }
    }

    for (const beDecorated of map.keys()) {
      doInstantiateBean(beDecorated);
    }
  }

  private initBean() {
    const map = getByFieldMetadata(Init);
    for (const [beDecoratedCls, { field, metadata }] of map.entries()) {
      const bean = getComponent(beDecoratedCls, this);
      bean[field]?.(this);
    }
  }

  private startBean() {
    const map = getByFieldMetadata(Start);
    for (const [beDecoratedCls, { field, metadata }] of map.entries()) {
      const bean = getComponent(beDecoratedCls, this);
      bean[field]?.();
    }
  }

  private validateTarget() {
    const allDecoratorParams = get();
    for (const [beDecoratedCls, params] of allDecoratorParams.entries()) {
      for (const param of params) {
        const { metadataClass, metadataKind, decoratorName } = param;
        const decoratorDecoratorParams =
          allDecoratorParams.get(metadataClass) || [];
        const find = decoratorDecoratorParams.find(
          (i) => i.metadataClass === Target
        );
        if (!find) {
          if (__DEV__) {
            console.warn(
              `${metadataClass}应该添加@target装饰器，以明确装饰器对象。`
            );
          }
          return;
        }
        if (find.metadataParam.indexOf(metadataKind) === -1) {
          if (__DEV__) {
            console.error(
              beDecoratedCls,
              '没有按照target限制使用装饰器:',
              metadataClass,
              '。'
            );
          } else {
            throw new Error(
              `[${beDecoratedCls.name}]使用@${decoratorName}和其定义的@target值不一致。`
            );
          }
        }
      }
    }
  }
}

export default ApplicationContext;
