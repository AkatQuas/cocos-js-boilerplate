# Cocos-js-boilerplate

A boilerplate on Cocos-JS, A short one with only the folder architecture, config files. Copy the whole framework folder and you are good to go, either run / compile.

## IMPORTANT 

**Blur Image on Android Browser.** [doc is here](http://blog.csdn.net/caonidayeheixiu8/article/details/71619062), [code is here](./snippets/DPR-responsive.js).

Some small twists are needed if the project cann't run after `rsync`.

`src/app.js` have overwirtten the class `cc.LoaderScene`, and after resource pre-loading, run the `HelloScene` which is located in `src/views/hello.scene.js`.

It is a good idea to create a small scene to loading the resources and then show the `click to play` button.

Don't forget to refer the js files in the `jsList` field in `project.json` in the root directory.

Some useful snippets on using vanilla Cocos-2s-X-JS are located in `snippets` directory.

- **File naming Convention**: lower case with hyphen delimiter, with type indication before extensions.

- Writing the simple & eazy layer implementation in `*.scene.js` in simple scene

- change the golbal config properly before run into the next scene

- **MVC**,scene controll the game logic, set the variables and invoke the view effects on the layer, so the layer becomes the VIEW in MVC~

- **Wechat Size**, support the window in wechat, the size should be 1080*1740

- **Audio**, music -> `*.mp3`, effects -> `*.mp3`, 44100KHz, >= 92Kb, Monophony

- **Random**, check [file](./src/utils/random.js)

- **Modules** , check the `moduleConfig.js` in directory `frameworks/cocos2d-html5` and modify the `project.json` in the root folder.

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

