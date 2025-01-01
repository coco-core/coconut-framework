const jsonfile = require('jsonfile');
const glob = require('glob');
const ejs = require('ejs');
import prompts from 'prompts';
import path from 'path';
import fse from 'fs-extra';

async function createApp() {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: '项目名称？',
    },
    {
      type: (projectName: string) => {
        const targetDir = path.resolve(process.cwd(), projectName);
        return fse.pathExistsSync(targetDir) ? 'confirm' : null;
      },
      name: 'deleteExistFolder',
      message: (projectName: string) => {
        return `当前目录下已经存在${projectName}，确定【删除${projectName}】并继续？`;
      },
      initial: true,
    },
  ]);

  const { projectName, deleteExistFolder } = response;
  const targetDir = path.resolve(process.cwd(), projectName);
  if (deleteExistFolder === false) {
    return;
  } else if (deleteExistFolder) {
    fse.removeSync(targetDir);
  }

  const templateFolder = path.resolve(__dirname, '..', 'template');
  // 复制非ejs文件
  const noEjsFiles = glob.sync(`${templateFolder}/**/*`, {
    ignore: '**/*.ejs',
    nodir: true,
  });
  for (const file of noEjsFiles) {
    const targetPath = path.join(
      targetDir,
      path.relative(templateFolder, file)
    );
    fse.copySync(file, targetPath);
  }

  // 生成package.json
  const packageJsonEjs = path.resolve(templateFolder, 'package.json.ejs');
  const cliPackageJson = jsonfile.readFileSync(
    path.resolve(__dirname, '..', 'package.json')
  );
  // 目前coco-mvc和coco-cli的版本号保持一致
  const renderedContent = await ejs.renderFile(packageJsonEjs, {
    name: projectName,
    version: cliPackageJson.version,
  });
  await fse.outputFileSync(
    path.join(targetDir, 'package.json'),
    renderedContent
  );
}

export default createApp;
