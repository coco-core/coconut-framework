module.exports = {
  presets: [require.resolve('@babel/preset-typescript')],
  plugins: [
    [
      require.resolve('@babel/plugin-proposal-decorators'),
      { version: '2023-11' },
    ],
    [
      require.resolve('@babel/plugin-transform-react-jsx'),
      {
        runtime: 'automatic',
        importSource: 'coco-mvc',
      },
    ],
  ],
};
