const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { transpileModule } = require('typescript');

function writeFile(folder, fileName, content) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  fs.writeFileSync(path.join(folder, fileName), content);
}

async function compiler (targets) {
  for (const t of targets) {
    const {input, output} = t;
    // clean
    if (fs.existsSync(output)) {
      fs.rmSync(output, { recursive: true });
    }
    for (const file of glob.globIterateSync(`${input}/**/*.ts`)) {
      // compiler
      const source = fs.readFileSync(file, "utf-8");
      const result = transpileModule(source, {
        compilerOptions: {module: "node16"},
      });

      const {dir, name} = path.parse(file);
      const relativePath = path.relative(input, dir);
      writeFile(
        path.join(`${output}`, relativePath),
        `${name}.js`,
        result.outputText
      )
    }
  }
}

module.exports = compiler
