import { createDecoratorExp } from '../ioc-container/create-decorator-exp.ts';
import Qualifier from '../metadata/qualifier.ts';

export default createDecoratorExp<string, ClassFieldDecoratorContext>(
  Qualifier
);
