const { execSync } = require('child_process');
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
  ]);

  const { projectName } = response;
  const targetDir = path.resolve(process.cwd(), projectName);
  fse.ensureDirSync(targetDir, { recursive: true });

  // 复制模板
  const templateDir = path.resolve(__dirname, '..', 'template');
  fse.copySync(templateDir, targetDir);

  execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
}

export default createApp;
