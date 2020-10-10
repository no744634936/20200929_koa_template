这是一个自己配置的属于自己的脚手架

因为上一次写cms系统的时候，是从零开始配置各种文件.
还必须手动ctrl 加 alt 加 n 来开启app.js很麻烦，
所以这次使用
koa脚手架来快速生成项目
端口在 bin/www文件里的
var port = normalizePort(process.env.PORT || '3000');
可以用来更改端口



npm install -g koa-generator (全局安装一个电脑只需要安装一次。)

koa2 -e koa2_weibo      (-e 表示用的是ejs模板引擎koa2_weibo　是项目名。)

npm install



感觉ejs难用，所有删除ejs 使用art-template 模板引擎

npm uninstall ejs --save


app.js 文件里删掉这俩个部分

const views = require('koa-views')

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


导入art-template模板


----------------------------------------------------------
配置环境

npm install --save-dev cross-env

在package.json 里面将

    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",

    改成

    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",


至于怎么用，后面会解释。



调整一下文件结构 将 public，controller， model，view，route app.js 文件夹放入src文件夹里

然后将 bin/www 文件里的
var app = require('../app');

改为

var app = require('../src/app');

localhost:3000/ 运行的就是app.js这个文件。

--------------------------------------------------------------------
npm install mongoose --save
npm install jsonwebtoken --save
npm install ajv --save
npm install ajv-errors --save

这个template可以有连接mongoose，有user signup signin功能。登录验证,post的数据验证
以后就不用再从头搭建了。



--------------------------------------------------------------------------------------

注意要启动服务器的时候要用这样的命令

npm run dev

npm run prd

npm start

ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
前端部分

建立客户端，客户端连接后台

npx create-react-app client

在client/packag.json文件中像下面这样更改client的port 并添加proxy

"start": "SET PORT=5500 && react-scripts start",

"proxy": "http://localhost:3000"

如何让server跟client 一起运行。

cd 到server文件夹下，

npm install concurrently --save

然后在server/package.json文件里面写上这两句

"client": "npm start --prefix ../client",

"both": "concurrently "npm run dev" "npm run client""

然后 在server文件夹下 npm run both 就可以同时打开，server 跟client 两个服务器。
---------------------------------

npm install react-bootstrap bootstrap

