# Cocos-js-boilerplate

A boilerplate on Cocos-JS, A short one with only the folder architecture, config files. Copy the whole framework folder and you are good to go, either run / compile.

## IMPORTANT 

Some small twists are needed if the project cann't run after `rsync`.

`src/app.js` have overwirtten the class `cc.LoaderScene`, and after resource pre-loading, run the `HelloScene` which is located in `src/views/hello.scene.js`.

Don't forget to refer the js files in the `jsList` field in `project.json` in the root directory.

Some useful snippets on using vanilla Cocos-2s-X-JS are located in `snippets` directory.

- Filenaming Convention: lower case with hyphen delimiter, with type indication before extensions.

- Writing the simple & eazy layer implementation in `*.scene.js` in simple scene

- change the golbal config properly before run into the next scene

## How to use this boilerplate

**./syncf**: for `rsync`ing files with the project folder in the initial phase.

```bash
# some basic folder architecture and useful files
# need to be initialized.
# using the command to copy all the initialize them

# only one parameter, the project folder

./syncf PROJECTFOLDER

```

# Tips

Simple shell scripts are listed here. Be careful when publish with `--advanced` for the [not-so-smart Uglyfing process in Closure Compiler](http://www.cocos.com/docs/html5/v3/getter-setter-api/zh.html). 

And to be honest to throw a TLNR [article](https://developers.google.com/closure/compiler/docs/api-tutorial3).

```shell
# create a new project with cocos js
cocos new -l js -p com.akat.game [PROJECT DIR]

# running the game in development
cocos run -p web -q --port 8321

# publish in web
cocos run -p web -q -m release [--advanced]
```

