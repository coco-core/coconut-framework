import { Metadata, target, Target, genDecorator } from 'coco-mvc';

@target([Target.Type.Field])
class Validate extends Metadata {}

export default genDecorator(Validate, { optional: true });
