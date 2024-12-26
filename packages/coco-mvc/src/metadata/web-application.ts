import { Metadata, target, Target, configuration } from 'coco-ioc-container';

@target([Target.Type.Class])
@configuration()
class WebApplication extends Metadata {}

export default WebApplication;
