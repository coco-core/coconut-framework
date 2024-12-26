import { ClassContext, genDecorator } from 'coco-ioc-container';
import View from '../metadata/view.ts';

export default genDecorator<string, ClassContext>(View, { optional: true });
