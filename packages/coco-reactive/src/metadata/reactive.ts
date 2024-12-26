import { Metadata, target, Target } from 'coco-ioc-container';

/**
 * 加在field表明是响应式
 * 加在metadata上用于自定义reactive元数据
 */
@target([Target.Type.Field, Target.Type.Class])
class Reactive extends Metadata {}

export default Reactive;
