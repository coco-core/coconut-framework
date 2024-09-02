import {Context, Decorator, KindClass, KindField, Target} from "../annotation/export.ts";
import {addClsAnnotation, addFieldAnnotation, getClsAnnotation,} from "../ioc-container/annotation-runtime-config.ts";
import {AnnotationCls} from "../annotation/abs-annotation.ts";
import {FieldContext} from "../annotation/decorator-context.ts";
import {TargetType} from "./target.ts";

function assetsTarget(Annotation: AnnotationCls, context: Context) {
  if (!Annotation.ignoreTargetCheck) {
    const target = <Target>getClsAnnotation(Annotation, Target);
    if (!target) {
      if (__DEV__) {
        console.warn(`${Annotation}需要添加target来确定装饰范围!!`);
      }
      return;
    }
    if (!target.value.includes(context.kind as TargetType)) {
      throw new Error(`${Annotation.name}只能装饰${target.value}`);
    }
  }
}

function genDecorator<Arg, C extends Context>(
  Annotation: AnnotationCls,
  initializer?: any,
): (arg: Arg) => Decorator {
  return function (arg: Arg){
    return function (value, context: C) {
      assetsTarget(Annotation, context);
      switch (context.kind) {
        case KindClass:
          addClsAnnotation(value, Annotation, arg);
          break;
        default:
          break;
      }
      context.addInitializer(function(){
        switch (context.kind) {
          case KindField:
            addFieldAnnotation(this.constructor, (<FieldContext>context).name, Annotation, arg);
            break;
          default:
            return;
        }
        initializer?.();
      })
      return undefined;
    }
  }
}

export default genDecorator;