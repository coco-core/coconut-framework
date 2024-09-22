import { genDecorator } from 'coco-mvc';

class B {}
export default genDecorator({ MetadataCls: B })
export const decoratorName = 'b';
