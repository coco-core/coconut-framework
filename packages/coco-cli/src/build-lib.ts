import path from 'node:path';
import fs from 'node:fs';
import rollup from 'rollup';
import { execSync, spawn } from 'child_process';
import process from 'node:process';
import { resolveCli } from './util/resolve';

export const build = async () => {
  const rollup = resolveCli('rollup');
  const configPath = path.resolve(
    __dirname,
    '../build-config/lib/rollup.config.js'
  );
  const args = ['--config', configPath];
  return spawn(rollup, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};
