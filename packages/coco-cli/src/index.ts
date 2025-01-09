import { dev, build } from './dev';
export { genDotCoco } from './gen-dot-coco';
import { default as createApp } from './create';

function cli(command: string, ...args: string[]) {
  switch (command) {
    case 'create':
      createApp();
      break;
    case 'dev':
      dev();
      break;
    case 'build':
      build();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      break;
  }
}

export { cli };
