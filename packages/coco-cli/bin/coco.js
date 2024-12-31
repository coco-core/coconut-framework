#!/usr/bin/env node
const path = require('path');
const cli = require('../dist/index.js');
const [, , command] = process.argv;

switch (command) {
  case 'create':
    cli.createApp();
    break;
  case 'dev':
    cli.dev();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    break;
}
