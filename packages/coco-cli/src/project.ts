import path from 'node:path';

class Project {
  // 项目所在文件夹的绝对路径
  absPath: string = '';

  get srcAbsPath() {
    return path.join(this.absPath, `src`);
  }

  get dotCocoAbsPath() {
    return path.join(this.srcAbsPath, Project.DOT_COCO_DIR);
  }

  get applicationTsFileAbsPath() {
    return path.join(this.srcAbsPath, Project.APPLICATION);
  }

  constructor(projectPath: string) {
    this.absPath = path.join(process.cwd(), projectPath);
  }

  static DOT_COCO_DIR = '.coco';
  static APPLICATION = 'application.ts';
  static VIEW_DIR = 'view';
  static CONFIG_DIR = 'config';
  static PAGE_DIR = 'page';
  static LAYOUT_DIR = 'layout';
  static CONTROLLER_DIR = 'controller';
  static SERVICE_DIR = 'service';
  static STORE_DIR = 'store';
  static GLOBAL_DATA_DIR = 'global-data';
  static COMPONENTS_DIR = 'component';

  public genFullPath = (name: string) => {
    return path.join(this.srcAbsPath, name);
  };
}

export default Project;
