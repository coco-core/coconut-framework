const cmdDefaultEnvMap = {
  dev: 'dev',
  build: 'prod',
};

/**
 * 综合NODE_ENV和命令得到环境配置文件的名
 * 如果有NODE_ENV，则返回
 * 如果没有，则考虑dev和build默认设定
 */
const getEnvConfigName = (cmd: string) => {
  const env = process.env.NODE_ENV;
  return env || cmdDefaultEnvMap[cmd];
};

export { getEnvConfigName };
