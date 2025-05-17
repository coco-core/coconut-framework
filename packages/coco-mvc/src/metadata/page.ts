import { Metadata, target, Target } from 'coco-ioc-container';
import view from '../decorator/view.ts';

/**
 * @public
 */
@target([Target.Type.Class])
@view()
class Page extends Metadata {}

export default Page;
