import { createDecoratorExp } from 'coco-ioc-container';
import GlobalData from '../metadata/global-data.ts';

export default createDecoratorExp<string, ClassDecoratorContext>(GlobalData, {
  optional: true,
});
