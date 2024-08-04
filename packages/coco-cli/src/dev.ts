import { webpack } from 'webpack';
import * as process from 'process';
import * as fs from 'fs';
import * as path from 'path';
import Paths from "./paths";
import { scan } from "./scanner";

export const dev = () => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error("当前似乎不是在一个项目中")
  }
  const paths = new Paths(cwd);
  // 1. scan
  const iocComponents = scan(paths)
  console.log('=======components===========', iocComponents);

  // 2. write file
  if (fs.existsSync(paths.dotCocoFolder)) {
    // clean
    fs.rmSync(paths.dotCocoFolder, { recursive: true });
  }
  // create
  fs.mkdirSync(paths.dotCocoFolder, { recursive: true });
  fs.writeFileSync(path.join(paths.dotCocoFolder, "./index.jsx"), `
import {render} from "coco-mvc";
import App from "../page/app";

const container = document.getElementById("root");

render(<App />, container);
  `, "utf-8")


  // const container = new IocContainer()


  const entry = path.join(paths.dotCocoFolder, './index.jsx');
  const outputPath = path.join(paths.projectRoot, './dist');
  console.log('=======eeee===========', entry, outputPath);
  // 3. webpack start
  const compiler = webpack({
    entry: entry,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  ["@babel/plugin-proposal-decorators", { "version": "2023-11" }],
                  ["@babel/plugin-transform-react-jsx", {
                    "runtime": "automatic",
                    "importSource": "coconut"
                  }]
                ],
              },
            }
          ],
          exclude: /node_module/
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    output: {
      filename: 'main.js',
      path: outputPath,
    },
  }, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.message) {
        console.error(err.message);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });
  compiler.run(() => {
    console.log('======= compile finished===========', );
  })
}
