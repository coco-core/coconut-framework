import { genDecorator } from 'coco-ioc-container';
import GlobalData from '../metadata/global-data.ts';

export default genDecorator<string, ClassDecoratorContext>(GlobalData, {
  optional: true,
});
