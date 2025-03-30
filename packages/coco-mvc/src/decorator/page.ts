import { genDecorator } from 'coco-ioc-container';
import Page from '../metadata/page.ts';

export default genDecorator<string, ClassDecoratorContext>(Page, {
  optional: true,
});
