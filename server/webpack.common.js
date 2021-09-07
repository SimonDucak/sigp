const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/shared-resources")
        ],
        use: ["babel-loader"],
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["npm run server"],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
};
