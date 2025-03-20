import path from 'node:path';
import process from 'node:process';

export function resolveFromProject(cmdName: string) {
  return path.resolve(process.cwd(), `./node_modules/.bin/${cmdName}`);
}
