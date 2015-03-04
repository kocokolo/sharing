# sumarry

这个工程是我为了分享而建立的，标新立异一下，今天的分享我想先从一个具体的工程开始,用做项目的思路做分享~

当然光有代码没PPT也不行，所以我也做了一个PPT，在项目的/slider目录下
视觉效果上，添加了一定的特效，让人有一种云山雾绕，漫步云端的感觉，体现一定的前端之美~

立足WEB前端领域做HTML5专题开发系列的试验田，也是希望我能沿着这条路线分享下去~

# project structure

本项目整体包含前后端部分

server端主要是用nodejs写的一个web服务器，提供基本的静态资源文件访问功能和简单的后端业务逻辑支撑。

    1.入口文件app.js
    2.具体实现在server

浏览器端代码：

    1.canvas包含了一个简单的canvas示例
    2.screensharer是采用websocket和canvas技术实现的个人创意的一个小工具。
    3.painter 是一个尚未完成的demo

其它：

    node_modules 包含了server端依赖的第三方库，目前有express框架和socket.io框架

# run

1.首先需要安装nodejs->www.nodejs.org

2.安装前端构建工具gulp，及其依赖

3.执行node app 启动服务即可

#入题
**** 今天我分享的题目是：

    --WEB前端HTML5开发之“Canvas入门与拓展”

Let's go!
