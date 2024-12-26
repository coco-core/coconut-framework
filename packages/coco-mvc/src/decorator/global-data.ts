import { ClassContext, genDecorator } from 'coco-ioc-container';
import GlobalData from '../metadata/global-data.ts';

export default genDecorator<string, ClassContext>(GlobalData, {
  optional: true,
});
