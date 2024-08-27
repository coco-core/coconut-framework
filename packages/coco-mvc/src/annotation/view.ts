/**
 * 视图层注解
 */
import {addClsAnnotation} from "../ioc-container/export";
import {Component} from "./component";
import scope from './scope';

@scope()
export class View extends Component {
  constructor(id?: string) {
    super(id);
  }
}

// decorator
export default function view(id?: string) {
  return function (value, {kind}: ClassContext) {
    if (kind === 'class') {
      addClsAnnotation(value, View, id ?? value.prototype.constructor.name);
    } else {
      throw new Error(`${String(View)}只能装饰类`);
    }
    return value;
  }
}
