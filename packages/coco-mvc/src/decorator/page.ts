import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import Page from '../metadata/page.ts';

export default createDecoratorExp(
  Page
) as () => Decorator<ClassDecoratorContext>;
