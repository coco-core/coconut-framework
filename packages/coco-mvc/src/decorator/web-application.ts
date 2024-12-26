import { ClassContext, genDecorator } from 'coco-ioc-container';
import WebApplication from '../metadata/web-application.ts';

export default genDecorator<void, ClassContext>(WebApplication, {
  optional: true,
});
