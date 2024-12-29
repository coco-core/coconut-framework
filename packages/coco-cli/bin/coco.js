#!/usr/bin/env node
const path = require('path');
const cli = require('../dist/index.js');
const [, , command] = process.argv;

switch (command) {
  case 'dev':
    cli.dev();
    break;
  case 'genDotCoco':
    cli.genDotCoco();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    break;
}
