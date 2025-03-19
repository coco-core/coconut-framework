import path from 'node:path';
import fs from 'node:fs';
import rollup from 'rollup';
import { execSync, spawn } from 'child_process';
import process from 'node:process';

export const build = async () => {
  const rollupJs = path.resolve(
    __dirname,
    '../node_modules/rollup/dist/bin/rollup'
  );
  const configPath = path.resolve(
    __dirname,
    '../build-config/lib/rollup.config.js'
  );
  const args = [rollupJs, '--config', configPath];
  return spawn('node', args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};
