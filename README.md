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
        |------------------------|
        | |--------------------| |
        | |     JS output      | |
        | | (default bundle.js)| |
        | |--------------------| |
        |                        |
        | |--------------------| |
        | |       *.css        | |
        | |--------------------| |
        |                        |
        | |--------------------| |
        | |       *.png        | |
        | |--------------------| |
        |           ...          |
        |------------------------|
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
  3. create file `webpack.config.js`
     ```js
     // npm not support `import` yet
     // import 'path';
     const path = require('path');

     module.exports = {
       // webpack entry
       entry: './src/index.js',
       output: {
         filename: 'bundle.js',
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
# provided dependency
npm install --save-dev webpack
```
# Compile
```bash
node_modules/.bin/webpack
```