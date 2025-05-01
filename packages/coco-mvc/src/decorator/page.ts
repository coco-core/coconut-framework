import { createDecoratorExp } from 'coco-ioc-container';
import Page from '../metadata/page.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(Page, {
  optional: true,
});
