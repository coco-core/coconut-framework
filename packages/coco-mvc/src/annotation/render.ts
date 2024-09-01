import {Annotation, addFieldAnnotation, getFields} from "coco-ioc-container";
import type {FieldContext} from "coco-ioc-container";

export class Render extends Annotation{
}

// decorator
export default function render(value, { kind, name, addInitializer }: FieldContext) {
  if (kind === 'field' || kind === 'method') {
    addInitializer(function () {
      if (__DEV__) {
        const existed = getFields(this.constructor, Render);
        if (existed.length) {
          console.error(
            `view不能用于多个函数，自动忽略名为 ${name as string} 的渲染函数`,
          );
          return;
        }
      }
      addFieldAnnotation(this.constructor, name as string, Render)
      return undefined;
    });
  } else {
    throw new Error('view只能装饰类成员变量或者函数');
  }
  return undefined;
}
