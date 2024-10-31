import { Metadata, genDecorator } from 'coco-mvc';
import { mockFn } from '../../app.test';

class A extends Metadata {}

function postConstruct() {
  mockFn('b');
}

export default genDecorator(A, { postConstruct });
