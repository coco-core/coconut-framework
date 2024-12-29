import { webpack } from 'webpack';
import * as process from 'process';
import * as fs from 'fs';
import * as path from 'path';
import Paths from './paths';

export const dev = () => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  const paths = new Paths(cwd);
  const entry = path.join(paths.dotCocoFolder, './index.tsx');
  const outputPath = path.join(paths.projectRoot, './dist');
  // 3. webpack start
  const compiler = webpack(
    {
      mode: 'development',
      entry: entry,
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    [
                      '@babel/plugin-proposal-decorators',
                      { version: '2023-11' },
                    ],
                    [
                      '@babel/plugin-transform-react-jsx',
                      {
                        runtime: 'automatic',
                        importSource: 'coco-mvc',
                      },
                    ],
                  ],
                },
              },
            ],
            exclude: /node_module/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
      output: {
        filename: 'main.js',
        path: outputPath,
      },
    },
    (err, stats) => {
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
    }
  );
  compiler.run(() => {
    console.log('======= compile finished===========');
  });
};
