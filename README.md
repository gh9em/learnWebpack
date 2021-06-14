# learnWebpack

# Principle
## Work principle
```
|-------------------------------------------------|
||------------------|  |--------|                 |
||     JS entry     |>>| Module |                 |
||(default index.js)|>>|   A    |                 |
||------------------|  |--------|     ...         |
|          ↓               ↓           ↑          |
|     |--------|       |--------|  |--------|     |
|     |Module B|>>>>>>>|Module C|>>|Module D|     |
|     |--------|       |--------|  |--------|     |
|          ↓               ↑           ↓          |
|     |--------|       |--------|  |--------|     |
|     |Module E|>>>>>>>|Module F|<<|Module G|>>...|
|     |--------|       |--------|  |--------|     |
|-------------------------------------------------|
              Web ↓ pack
        |---------------------|
        | |-----------------| |
        | |    JS output    | |
        | |(default main.js)| |
        | |-----------------| |
        |                     |
        | |-----------------| |
        | |      *.css      | |
        | |-----------------| |
        |                     |
        | |-----------------| |
        | |      *.png      | |
        | |-----------------| |
        |         ...         |
        |---------------------|
```
## Project structure
```bash
|-dist
| |--index.html # import *.bundle.js with <script> tags
| |--*.bundle.js # webpack outputs
|-src
| |--*.js # includes webpack entries
| |--*.html
| |--*.css
| |--*.png
| |--*.woff
| |--...
|-webpack.config.js
|-package.json
```

# Environment
## NodeJs
update to the last stable version
```bash
npm install -g n
# sudo chmod -R 777 /usr/local && n stable
sudo n stable
```
## npm
update to the last version
```bash
npm install -g npm
```

# Setup
## Project
+ new application
  1. init
     ```bash
     npm init
     mkdir src
     ```
  2. config `package.json`
     ```json
     {
       ...
       // instead of entry field `"main": "index.js",`
       "private": true,
       ...
     }
     ```
  3. create `webpack.config.js`
     ```js
     // npm not support `import` yet
     // import 'path';
     const path = require('path');
     const HtmlWebpackPlugin = require('html-webpack-plugin');

     module.exports = {
       // webpack entry
       entry: {
         index: './src/index.js',
       },
       plugins: [
         // output index.html
         new HtmlWebpackPlugin({
           title: 'Hello Webpack',
         }),
       ],
       output: {
         filename: '[name].[contenthash].bundle.js',
         path: path.resolve(__dirname, 'dist'),
         // clean dist before compile
         clean: true,
       },
     };
     ```
+ new library
  1. init
     ```bash
     npm init
     mkdir src
     ```
  2. create `webpack.config.js`
     ```js
     // npm not support `import` yet
     // import 'path';
     const path = require('path');

     module.exports = {
       // webpack entry
       entry: {
         index: './src/index.js',
       },
       output: {
         filename: 'library.js',
         library: {
           name: 'libraryName',
           type: 'umd',
         },
         path: path.resolve(__dirname, 'dist'),
         // clean dist before compile
         clean: true,
       },
       // provided dependency, see more https://www.tangshuang.net/3343.html
       externals: [
         jQuery: {
           commonjs: 'jQuery',
           commonjs2: 'jQuery',
           amd: 'jQuery',
           // import by <scrpit> tag
           root: '$',
         },
         'xxx',
         /xxx/,
       ],
     };
     ```
+ load exist
  ```bash
  npm install
  ```
## Dependency
```bash
# `--save-dev` means provided dependency
npm install --save-dev webpack
npm install --save-dev html-webpack-plugin
```
# Compile
```bash
# npx webpack(since Node@8.2 and npm@5.2.0)
node_modules/.bin/webpack --config webpack.config.js
```
# Enviroment
## Usage
1. config `webpack.config.js`
   ```js
   ...
   module.exports = (env) => {
     ...
   };
   ```
2. config `package.json` or run command `npx webpack --env key=value`
    ```js
    {
      ...
      "scripts": {
        ...
        "watch": "webpack --env key=value",
      },
    };
    ```
# Pre Module
## Principle
```
time>>>>>>>>>
  ↓ |----------------------| |-----------|
  ↓ |      Preload JS      | |current JS |
  ↓ |(<link rel="preload">)| |(<script>) |
  ↓ |----------------------| |-----------|
----------------------------------------------
  ↓              |-----------------------|
  ↓              |      Prefetch JS      |
  ↓              |(<link rel="prefetch">)|
  ↓              |-----------------------|
  ↓
```
## Usage
+ Preload: config `*.js`
  ```js
  ...
  // such as loading dialog
  import(/* webpackPreload: true */ 'xxx');
  ```
+ Prefetch: config `*.js`
  ```js
  ...
  import(/* webpackFetch: true */ 'xxx');
  ```
# Shared Module
## Usage
+ static
  + `dependOn` field: config `webpack.config.js`
    ```js
    ...
    module.exports = {
      ...
      // webpack entry
      entry: {
        index: {
          import: './src/index.js',
          dependOn: 'xxx'
        },
        generator: {
          import: './src/generator.js',
          dependOn: 'xxx'
        },
        xxx: 'sharedLibName',
      },
      optimization: {
        // export global runtime code to import multi entries
        runtimeChunk: 'single',
      },
    };
    ```
  + SplitChunks plugin: config `webpack.config.js`
    ```js
    ...
    module.exports = {
      ...
      // webpack entry
      entry: {
        index: './src/index.js',
        generator: './src/generator.js',
      },
      optimization: {
        // export global runtime code to import multi entries
        runtimeChunk: 'single',
        splitChunks: {
          // separate third modules when export
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
        // keep ids of separated third module when export
        moduleIds: 'deterministic',
      },
    };
    ```
+ dynamic
  + `import` func: config `*.js`
  ```js
  async function func() {
    // deconstruct module.exports object's field `default` to `$`
    const { default: $ } = await import('jQuery');
    ...
  };
  ...
  func().then(...);
  ```
# Loader
## CSS Loader
### Principle
```
|-------|  |------------|  |----------| <style>...</style>  |--------|
| *.css |>>|style-loader|>>|css-loader|>>>>>>>>>>>>>>>>>>>>>| *.html |
|-------|  |------------|  |----------|                     |--------|
```
### Usage
1. add dependency
   ```bash
   npm install --save-dev style-loader css-loader
   ```
2. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         {
           test: /\.css$/i,
           // make sure order is style-loader>>css-loader
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   };
   ```
3. config custom `*.js`
```js
import './*.css';
...
```
## CSV Loader
### Usage
1. add dependency
   ```bash
   npm install --save-dev csv-loader
   ```
2. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         {
           test: /\.(csv|tsv)$/i,
           use: ['csv-loader'],
         },
       ],
     },
   };
   ```
3. config custom `*.js`
```js
import csv from './*.csv';
console.log(csv);
...
```
## XML Loader
### Usage
1. add dependency
   ```bash
   npm install --save-dev xml-loader
   ```
2. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         {
           test: /\.xml$/i,
           use: ['xml-loader'],
         },
       ],
     },
   };
   ```
3. config custom `*.js`
```js
import xml from './*.xml';
console.log(xml);
...
```
## Parse(Custom Loader)
### Usage
Such as `YAML`
1. add dependency
   ```bash
   npm install --save-dev yamljs
   ```
2. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         {
           test: /\.yaml$/i,
           type: 'json',
           parser: {
             parse: yaml.parse,
           },
         },
       ],
     },
   };
   ```
3. config custom `*.js`
```js
import yaml from './*.yaml';
console.log(yaml);
...
```
# Asset Modules
type:
+ `asset`: auto choose by size
  + `asset/resource`(file-loader): store files
  + `asset/inline`(url-loader): store base64 code `url(data:)`
  + `asset/source`(raw-loader): store bin-text
## Image
### Usage
1. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         ...
         {
           test: /\.(png|svg|jpg|jpeg|gif)$/i,
           type: 'asset/resource',
         },
         ...
       ],
     },
   };
   ```
2. config custom `*.js` or `*.css`
```js
import pngImg from './*.png';
// import svgImg from './*.svg';
// import jpgImg from './*.jpg';
// import jpegImg from './*.jpeg';
// import gifImg from './*.gif';
...
```
```css
* {
  ...
  backgroud: url('./*.png');
  ...
}
...
```
## Font
### Usage
1. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     module: {
       rules: [
         ...
         {
           test: /\.(woff|woff2|eot|ttf|otf)$/i,
           type: 'asset/resource',
         },
         ...
       ],
     },
   };
   ```
2. config custom `*.css`
```css
@font-face {
  font-family: 'font';
  src: url('./*.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}
* {
  ...
  font-family: 'font';
  ...
}
...
```
# Debug
## Keep Signature
### Usage
1. config `webpack.config.js`
   ```js
   ...
   module.exports = {
     ...
     mode: 'development',
     devtool: 'inline-source-map',
   };
   ```
## Hot Deploy
### Usage
+ webpack's Watch Mode
  1. config `package.json` or run command `npx webpack --watch`
    ```js
    {
      ...
      "scripts": {
        ...
        "watch": "webpack --watch",
      },
    };
    ```
+ webpack-dev-middleware(Express middleware)
  1. add dependency
    ```bash
    npm install --save-dev webpack-dev-middleware
    ```
  2. config `webpack.config.js`
    ```js
    ...
    module.exports = {
      ...
      mode: 'development',
      output: {
        // server context-path
        publicPath: '/',
      },
    };
    ```
  3. add `server.js`
    ```js
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const app = express();
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
      })
    );
    app.listen(8080, function () {
      console.log('Webpack Server listening on port 8080!\n');
    });
    ```
  4. config `package.json` or run command `node server.js`
    ```js
    {
      ...
      "scripts": {
        ...
        "server": "node server.js",
      },
    };
    ```
+ webpack-dev-server(webpack's Watch Mode + webpack-dev-middleware)
  1. ~~add dependency~~
    ```bash
    npm install --save-dev webpack-dev-server
    ```
  2. ~~config `webpack.config.js`~~
    ```js
    ...
    module.exports = {
      ...
      mode: 'development',
      devServer: {
        // server webapp-path
        contentBase: './dist',
      },
    };
    ```
  3. config `package.json` or run command `npx webpack serve --open`
    ```js
    {
      ...
      "scripts": {
        ...
        "start": "webpack serve --open",
      },
    };
    ```