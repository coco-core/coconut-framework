class PropertiesConfig {
  beanConfig: Record<string, any>;

  constructor(jsonConfig: Record<string, any> = {}) {
    this.beanConfig = jsonConfig;
  }

  public getValue(path: string): any {
    let value = this.beanConfig;
    for (const prop of path.trim().split('.')) {
      if (!value) {
        if (__DEV__) {
          console.warn(`没有取到${path}对应的配置值！`);
        }
        break;
      }
      value = value[prop];
    }
    return value;
  }
}

export default PropertiesConfig;
