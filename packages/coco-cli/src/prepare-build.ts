import genIndexTsx from './gen-index-tsx';
import mergeProperties from './merge-properties';
import { validateConstructor } from './validate-constructor';
import Project from './project';
import path from 'node:path';
import process from 'node:process';
import chokidar from 'chokidar';
import type { FSWatcher } from 'chokidar';
import fs from 'fs';
import { scanOneFile, scan, scanPathConfig, ScanResult } from './scanner';

class Watcher {
  project: Project;
  iocComponents: ScanResult;
  chokidarWatcher: FSWatcher;

  /**
   * 目前仅支持单体应用，为了单元测试，可以传入子应用相对项目根的路径
   * @param monorepoPath
   */
  constructor(monorepoPath: string = '.') {
    this.project = new Project(monorepoPath);
    this.iocComponents = scan(this.project);
  }

  ensureEmptyDotCocoFolder = (project: Project) => {
    if (fs.existsSync(project.dotCocoAbsPath)) {
      fs.rmSync(project.dotCocoAbsPath, { recursive: true });
    }
    fs.mkdirSync(project.dotCocoAbsPath);
  };

  /**
   * 完成构建前的准备工作
   */
  doPrepareWork = (cmd: 'dev' | 'build') => {
    this.ensureEmptyDotCocoFolder(this.project);
    validateConstructor(this.project);
    mergeProperties(this.project, cmd);
    genIndexTsx(this.project, this.iocComponents);
  };

  startListen = () => {
    process.on('message', (msg) => {
      switch (msg) {
        case 'start': {
          this.doPrepareWork('dev');
          process.send('prepare-success');
          this.startWatch();
          break;
        }
      }
    });
  };

  isTsTsxFile = (path: string) => {
    return path.endsWith('.ts') || path.endsWith('.tsx');
  };

  handleAddFile = (filePath: string) => {
    if (this.isTsTsxFile(filePath)) {
      const { dir, ext } = path.parse(filePath);
      const match = scanPathConfig.find((item) => {
        return dir.startsWith(item.path) && item.fileExt === ext;
      });
      if (!match) {
        return;
      }
      const scanRlt = scanOneFile(
        this.project.genFullPath(filePath),
        match.decorator
      );
      if (scanRlt !== null) {
        if (!this.iocComponents.find((i) => i.filePath === scanRlt.filePath)) {
          // 新增一个组件
          this.iocComponents.push(scanRlt);
          genIndexTsx(this.project, this.iocComponents);
        } else {
          // ignore
        }
      }
    }
  };

  handleDeleteFile = (filePath: string) => {
    if (this.isTsTsxFile(filePath)) {
      const fullPath = this.project.genFullPath(filePath);
      const index = this.iocComponents.findIndex(
        (i) => i.filePath === fullPath
      );
      if (index > 0) {
        this.iocComponents.splice(index, 1);
        genIndexTsx(this.project, this.iocComponents);
      }
    }
  };

  startWatch = () => {
    this.chokidarWatcher = chokidar.watch(this.project.srcAbsPath, {
      ignored: (absPath, stats) => {
        // 忽略.coco文件夹
        const srcPath = path.relative(this.project.srcAbsPath, absPath);
        return srcPath.startsWith('.coco');
      },
      ignoreInitial: true,
      cwd: this.project.srcAbsPath,
    });
    this.chokidarWatcher.on('add', this.handleAddFile);
    this.chokidarWatcher.on('change', this.handleAddFile);
    this.chokidarWatcher.on('unlink', this.handleDeleteFile);
  };
}

function runAsProcess() {
  const watcher = new Watcher();
  if (secondArgv === 'build-and-watch') {
    watcher.startListen();
  } else if (secondArgv === 'build-once') {
    watcher.doPrepareWork('build');
    process.exit(0);
  }
}

const secondArgv = process.argv[2];
if (secondArgv === 'build-and-watch' || secondArgv === 'build-once') {
  runAsProcess();
}

export default Watcher;
