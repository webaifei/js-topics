## 浏览器解析过程

1. 浏览器地址栏输入url 
2. DNS解析
3. 发起请求
4. server返回html，下载完成
5. 浏览器开始Parse HTML（解析一部分，就会渲染，并不是全部解析完成之后再去渲染）
6. 浏览器发现一个加载css的外链， 发起一个请求加载这个样式表文件，期间（下载css文件和解析css文件期间）， 不阻塞Parse HTML,但是因为css tree 没有构建完成，所以无法和DOM tree 一起构成render tree，后面的 layout, paint 也无法进行，所以文档后面内容无法展现到浏览器上
7. 发现一个外链js文件，发起一个请求，去请求js,期间（下载js解析执行js脚本）会阻塞document的解析，所以会导致阻塞后面dom tree和后面的css tree的构建，最终导致阻塞 render tree的形成，所以浏览器上看不到显示（注意：这个时候现代浏览器都会启动另外的线程去解析剩余的document，去加载后面的外部资源，但是不会影响dom tree）


|文件类型|是否阻塞后续DOM tree解析| 是否阻塞后续 css tree| 是否阻塞后续 render tree|是否影响最终展现屏幕上|备注|
|---|---|---|---|---|---|
|css样式|👍|√|√|√|阻塞js的执行|
|js脚本|√|√|√|√|js的下载和执行会阻塞dom 解析，自然会阻塞css tree的解析， 但是现代浏览器都会启动另外的线程去解析剩下的dom，但是只会下载需要的资源|


### 参考资料

1. https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#The_order_of_processing_scripts_and_style_sheets