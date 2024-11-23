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

export {
  expectInOrder,
  checkClassMetadataAsExpected,
  checkMetadataForMetadataAsExpected,
  getMetadata,
  getAllMetadata,
  clearMetadata,
  clearBeanDefinition,
};
