# postMessage 跨域通信
> postMessage 是一种实现跨域通信，突破同源策略的一种技术方案。

::: tip
并且postMessage被设计成了异步非阻塞。
:::
## 语法规范
```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```
1. otherWindow
其他窗口的一个引用，比如iframe的contentWindow属性、执行window.open返回的窗口对象、或者是命名过或数值索引的window.frames。

::: warning
otherWindow 一定不是当前执行postMessage脚本的window对象， 而是他包含的iframe.contentWindow 或者当前window.parent或者是window.open 返回的对象
:::

2. message
发送的数据

3. targetOrigin
通过窗口的origin属性来指定哪些窗口能接收到消息事件。其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送

注意 origin必须是包含域名的uri，不可以是IP


## 使用场景
1. 当前window对象内嵌iframe，当前的window和iframe可以进行postMessage通信;
```
//注意此情况下 `otherWindow`的值是 `iframe.contentWindow`（当前`window`给`iframe`发送） 或者是 `window.parent` （`iframe`给父窗口发送）
```
2. 当前window对象使用open方法 打开一个目标站点
```
//注意此情况下 `otherWindow`的值是 `window.open`的返回值 或者是 `window.opener` 
```

总结：
目前的情况看，基本上iframe这种情况居多，适合使用postMessage来进行通信。
## DEMO

### 安装依赖
```sh
yarn install
```

### 配置host
```sh
127.0.0.1 cross-site.com
```
### 启动服务
```sh
yarn start
```


参考： 
1. [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)
2. [维基百科](https://en.wikipedia.org/wiki/Web_Messaging#cite_note-canIuse-6)