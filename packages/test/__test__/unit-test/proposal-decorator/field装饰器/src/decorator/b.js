import { genDecorator } from 'coco-mvc';

class B {}
export default genDecorator(B);
export const decoratorName = 'b';
