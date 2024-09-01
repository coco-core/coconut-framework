import {ClassContext, ContextKind, Target} from "../annotation/export.ts";
import {addClsAnnotation, addFieldAnnotation, getClsAnnotation,} from "../ioc-container/annotation-runtime-config.ts";
import {AnnotationCls} from "../annotation/abs-annotation.ts";
import {FieldContext} from "../annotation/decorator-context.ts";

function assetsTarget(Annotation: AnnotationCls, context: ClassContext | FieldContext) {
  if (!Annotation.ignoreTargetCheck) {
    const target = <Target>getClsAnnotation(Annotation, Target);
    if (!target) {
      if (__DEV__) {
        console.warn(`${Annotation}需要添加target来确定装饰范围!!`);
      }
      return;
    }
    if (!target.value.includes(context.kind)) {
      throw new Error(`${Annotation.name}只能装饰${target.value}`);
    }
  }
}

function genDecorator<Arg>(
  Annotation: AnnotationCls,
  initializer?: any,
) {
  return function (arg: Arg){
    return function (value, context: ClassContext | FieldContext) {
      assetsTarget(Annotation, context);
      switch (context.kind) {
        case ContextKind.class:
          addClsAnnotation(value, Annotation, arg);
          break;
        default:
          break;
      }
      context.addInitializer(function(){
        switch (context.kind) {
          case ContextKind.field:
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