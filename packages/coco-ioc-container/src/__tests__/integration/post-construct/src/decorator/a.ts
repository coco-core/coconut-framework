import { Metadata, genDecorator } from 'coco-mvc';
import { mockFn } from '../../post-construct.test';

class A extends Metadata {}

function postConstruct() {
  mockFn('a');
}

export default genDecorator(A, { postConstruct });
