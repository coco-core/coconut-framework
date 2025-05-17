import { createDecoratorExp, type Decorator } from 'coco-ioc-container';
import GlobalData from '../metadata/global-data.ts';

export default createDecoratorExp(
  GlobalData
) as () => Decorator<ClassDecoratorContext>;
