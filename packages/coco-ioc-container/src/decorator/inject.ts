import Inject, { ClassList } from '../metadata/inject.ts';
import genDecorator from './gen-decorator-exp.ts';

export default genDecorator<ClassList, ClassDecoratorContext>(Inject);
