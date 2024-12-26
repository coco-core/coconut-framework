import { ClassContext, genDecorator } from 'coco-ioc-container';
import Router from '../metadata/router.ts';

export default genDecorator<string, ClassContext>(Router, {
  optional: true,
});
