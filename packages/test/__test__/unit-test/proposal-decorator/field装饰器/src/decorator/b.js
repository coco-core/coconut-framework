import { genDecorator, Metadata } from 'coco-mvc';

class B extends Metadata {}
export default genDecorator(B);
export const decoratorName = 'b';
