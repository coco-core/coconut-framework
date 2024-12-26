import { Metadata, target, Target } from 'coco-ioc-container';

@target([Target.Type.Method])
class Bind extends Metadata {}

export default Bind;
