import fs from 'fs';
import path from 'path';
import process from 'node:process';

function readFile(filepath: string) {
  let content = '{}';
  if (fs.existsSync(filepath)) {
    content = fs.readFileSync(filepath, 'utf8');
  }
  return content;
}

function genConfig(projectPath: string = './') {
  const defaultConfig = readFile(
    path.join(process.cwd(), projectPath, `properties/application.json`)
  );
  const env = process.env.NODE_ENV;
  let envConfig = '{}';
  if (env) {
    envConfig = readFile(
      path.join(
        process.cwd(),
        projectPath,
        `properties/application.${env}.json`
      )
    );
  }
  const config = merge(JSON.parse(defaultConfig), JSON.parse(envConfig));
  fs.writeFileSync(
    path.join(process.cwd(), projectPath, 'src/.coco/application.json'),
    JSON.stringify(config, null, 2),
    { encoding: 'utf-8' }
  );
}

// 从前往后依次合并配置对象
function merge(...configs: any[]): Record<string, any> {
  if (configs.length === 0) {
    return {};
  }

  return configs.reduce((prev, currentConfig) => {
    return config(prev, currentConfig);
  });
}

function config(config1, config2) {
  const type1 = typeof config1;
  const type2 = typeof config2;
  if (type1 !== type2) {
    return config2;
  } else if (
    type2 === 'string' ||
    type2 === 'boolean' ||
    type2 === 'number' ||
    config2 === null ||
    Array.isArray(config2)
  ) {
    return config2;
  }
  const keys2 = Object.keys(config2);
  const merged = { ...config1 };
  for (const key of keys2) {
    merged[key] = config(config1[key], config2[key]);
  }
  return merged;
}

export default genConfig;
