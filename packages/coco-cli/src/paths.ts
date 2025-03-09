import * as path from 'path';

class Paths {
  projectRoot = '';

  constructor(projectPath: string) {
    this.projectRoot = projectPath;
  }

  static DOT_COCO_DIR = '.coco';
  static APPLICATION = 'application.ts';
  static VIEW_DIR = 'view';
  static CONFIG_DIR = 'config';
  static PAGE_DIR = 'page';
  static CONTROLLER_DIR = 'controller';
  static SERVICE_DIR = 'service';
  static STORE_DIR = 'store';
  static GLOBAL_DATA_DIR = 'global-data';
  static COMPONENTS_DIR = 'component';

  public genFullPath = (name: string) => {
    return path.join(this.projectRoot, 'src', name);
  };
}

export default Paths;
