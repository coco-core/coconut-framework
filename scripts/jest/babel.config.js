module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }],
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic",
      "importSource": "coco-mvc"
    }]
  ]
};
