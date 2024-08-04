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

  get pageFolder() {
    return path.join(this.srcFolder, './page');
  }

  get controllerFolder() {
    return path.join(this.srcFolder, './controller');
  }

  get serviceFolder() {
    return path.join(this.srcFolder, './service');
  }
}

export default Paths;