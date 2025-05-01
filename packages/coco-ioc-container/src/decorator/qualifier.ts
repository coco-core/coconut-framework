import { createDecoratorExp } from './create-decorator-exp.ts';
import Qualifier from '../metadata/qualifier.ts';

export default createDecoratorExp<string, ClassFieldDecoratorContext>(
  Qualifier
);
