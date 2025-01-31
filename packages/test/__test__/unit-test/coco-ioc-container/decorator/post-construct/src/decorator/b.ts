import { Metadata, genDecorator } from 'coco-mvc';
import { mockFn } from '../../app.test';

class B extends Metadata {}

function postConstruct() {
  mockFn('b');
}

export default genDecorator(B, { postConstruct });
