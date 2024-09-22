import { genDecorator } from 'coco-mvc';

class A {}
export default genDecorator({ MetadataCls: A })
export const decoratorName = 'a';
