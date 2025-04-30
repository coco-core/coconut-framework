import { Metadata, genDecorator } from 'coco-mvc';
import { mockFn } from '../../post-construct.test';

class B extends Metadata {}

function postConstruct() {
  mockFn('b');
}

export default genDecorator(B, { postConstruct });
