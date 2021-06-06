# learnWebpack

# Principle
## Work principle
```
|---------------------------------------|
||--------|  |--------|                 |
||JS entry|>>|Module A|                 |
||--------|  |--------|     ...         |
|    ↓           ↓           ↑          |
||--------|  |--------|  |--------|     |
||Module B|>>|Module C|>>|Module D|     |
||--------|  |--------|  |--------|     |
|    ↓           ↑           ↓          |
||--------|  |--------|  |--------|     |
||Module E|>>|Module F|<<|Module G|>>...|
||--------|  |--------|  |--------|     |
|---------------------------------------|
             Web ↓ pack
          |--------------|
          | |----------| |
          | | bundle.js| |
          | |----------| |
          |      ↓       |
          | |----------| |
          | |index.html| |
          | |----------| |
          |--------------|
```
## Project structure
```bash
|-public # store static pages(*.html)
| |--*.html
|-app # store dynamics, such as: *.js, *.css
| |--main.js # project & depend-analyze entry
| |--*.js
| |--*.css
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
  ```bash
  npm init
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
