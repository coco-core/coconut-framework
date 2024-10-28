import { genDecorator, Metadata } from 'coco-mvc';

class A extends Metadata {}
export default genDecorator(A);
export const decoratorName = 'a';
