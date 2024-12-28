const jsonfile = require('jsonfile');
const path = require('path');
const process = require('process');

function prefixZero(num) {
  return num < 10 ? `0${num}` : num;
}

function updateVersion() {
  const now = new Date();
  const newVersion = `${now.getFullYear()}${now.getMonth() + 1}${prefixZero(now.getDate())}${prefixZero(now.getHours())}${prefixZero(now.getMinutes())}`;
  const packages = ['packages/coco-mvc', 'packages/coco-cli'];
  packages.forEach((pkg) => {
    const packageJson = path.join(process.cwd(), pkg, 'package.json');
    jsonfile.readFile(packageJson, (err, content) => {
      if (err) console.error(err);
      else {
        // 目前只更新最后的数字，表示发版的日期小时分钟。前面的版本号手动更新
        content.version = `${content.version.slice(0, -newVersion.length)}${newVersion}`;
        jsonfile.writeFile(packageJson, content, { spaces: 2 }, (err) => {
          if (err) console.error(err);
        });
      }
    });
  });
}

updateVersion();
