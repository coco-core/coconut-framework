import { dev, build } from './dev';
import { build as buildLib } from './build-lib';
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
      const arg = args[0];
      if (arg?.[0] === 'lib') {
        buildLib();
      } else {
        build();
      }
      break;
    default:
      console.log(`Unknown command: ${command}`);
      break;
  }
}

export { cli };
