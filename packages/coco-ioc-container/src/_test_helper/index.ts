import {
  expectInOrder,
  checkClassMetadataAsExpected,
  checkMetadataForMetadataAsExpected,
} from './decorator';

import {
  getMetadata,
  getAllMetadata,
  clear as clearMetadata,
} from '../ioc-container/metadata.ts';
import { clear as clearBeanDefinition } from '../ioc-container/bean-factory.ts';

import { clear as clearPreventCircularDependency } from 'shared';

function clear() {
  clearMetadata();
  clearBeanDefinition();
  clearPreventCircularDependency();
}

export {
  expectInOrder,
  checkClassMetadataAsExpected,
  checkMetadataForMetadataAsExpected,
  getMetadata,
  getAllMetadata,
  clear,
};
