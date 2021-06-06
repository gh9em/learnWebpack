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
| |--bundle.js # webpack output
|-src
| |--index.js # webpack entry
| |--*.html
| |--*.js
| |--*.css
| |--*.png
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
+ new
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

     module.exports = {
       // webpack entry
       entry: './src/index.js',
       output: {
         filename: 'main.js',
         path: path.resolve(__dirname, 'dist'),
       },
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
```
# Compile
```bash
# npx webpack(since Node@8.2 and npm@5.2.0)
node_modules/.bin/webpack --config webpack.config.js
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
