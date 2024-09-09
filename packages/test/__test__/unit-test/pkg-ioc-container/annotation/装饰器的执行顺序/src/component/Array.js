import { component } from 'coco-mvc';
import { a } from '../decorator/a';
import { b } from '../decorator/b';

@a('array')
@b('array')
@component()
class Array {
}

export default Array