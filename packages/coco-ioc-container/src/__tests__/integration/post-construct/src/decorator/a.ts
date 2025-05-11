import { Metadata, createDecoratorExp } from 'coco-mvc';
import { mockFn } from '../../post-construct.test';

class A extends Metadata {}

function postConstruct() {
  mockFn('a');
}

export default createDecoratorExp(A, { postConstruct });
