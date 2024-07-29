import { registerClz } from 'shared/meta.js';

interface Context {
  kind: 'class';
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}

function component(value, { kind }: Context) {
  if (kind === 'class') {
    registerClz(value);
  } else {
    throw new Error('component只能装饰类');
  }
  return undefined;
}

export { component };
