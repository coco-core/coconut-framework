import * as path from "path";

class Paths {
  projectRoot = ''

  constructor(projectPath: string) {
    this.projectRoot = projectPath;
  }

  get srcFolder () {
    return path.join(this.projectRoot, './src');
  }

  get dotCocoFolder() {
    return path.join(this.srcFolder, '.coco');
  }

  get viewFolder() {
    return path.join(this.srcFolder, './view');
  }

  get controllerFolder() {
    return path.join(this.srcFolder, './controller');
  }

  get serviceFolder() {
    return path.join(this.srcFolder, './service');
  }

  get componentFolder() {
    return path.join(this.srcFolder, './component');
  }
}

export default Paths;