#!/usr/bin/env node
const { cli } = require('../dist/index.js');
const [, , command, ...args] = process.argv;

cli(command, args);
