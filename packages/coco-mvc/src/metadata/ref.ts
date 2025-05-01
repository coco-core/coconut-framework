import {
  Metadata,
  component,
  Component,
  target,
  Target,
} from 'coco-ioc-container';

@target([Target.Type.Field])
class Ref extends Metadata {}

export default Ref;
