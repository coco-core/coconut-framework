import devApp from './dev-app';
import buildApp from './build-app';
import { build as buildLib } from './build-lib';
import { createApp, createLib } from './create';

function cli(command: string, ...args: string[]) {
  switch (command) {
    case 'create': {
      const arg = args[0];
      if (arg?.[0] === 'lib') {
        createLib();
      } else {
        createApp();
      }
      break;
    }
    case 'dev':
      devApp();
      break;
    case 'build': {
      const arg = args[0];
      if (arg?.[0] === 'lib') {
        buildLib();
      } else {
        buildApp();
      }
      break;
    }
    default:
      console.log(`Unknown command: ${command}`);
      break;
  }
}

export { cli };
