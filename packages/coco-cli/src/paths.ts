import * as path from 'path';

class Paths {
  projectRoot = '';

  constructor(projectPath: string) {
    this.projectRoot = projectPath;
  }

  get srcFolder() {
    return path.join(this.projectRoot, './src');
  }

  get dotCocoFolder() {
    return path.join(this.srcFolder, '.coco');
  }

  get applicationFile() {
    return path.join(this.srcFolder, 'application.ts');
  }

  get viewFolder() {
    return path.join(this.srcFolder, './view');
  }

  get configFolder() {
    return path.join(this.srcFolder, './config');
  }

  get controllerFolder() {
    return path.join(this.srcFolder, './controller');
  }

  get serviceFolder() {
    return path.join(this.srcFolder, './service');
  }

  get storeFolder() {
    return path.join(this.srcFolder, './store');
  }

  get componentFolder() {
    return path.join(this.srcFolder, './component');
  }
}

export default Paths;
