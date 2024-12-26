import { ClassContext, genDecorator } from 'coco-ioc-container';
import Render from '../metadata/render.ts';

export default genDecorator<string, ClassContext>(Render, { optional: true });
