import { genDecorator } from 'coco-mvc';

class A {}
export default genDecorator(A);
export const decoratorName = 'a';
