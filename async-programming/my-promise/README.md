### 自己实现一个promise

第一步：实现基本框架

- Promise对象， 包含状态和回调队列
- resolve方法实现
- then 方法实现 添加回调， 并且返回this 提供链式调用

第二步：实现
- 回调队列执行，value值的传递（允许then添加的回调函数对value值的修改）


第三步：改写回调的添加方法为异步串行执行做准备
版本2中，我们通过then为promise对象 添加回调,
通过resolve方法 修改promise的state，执行回调

这个版本我们将改写then方法，每次返回的不再是当前的promise对象，
而是返回一个新的promise对象（这样也能够支持链式调用），
并且重新包装了回调函数：
1. 执行原来用户添加的回调函数
2. 执行新promise对象的resolve方法 这样就能够触发后续then方法中实例化的promise对象的回调函数了






参考资料：
1. [20行实现一个promise](https://opensourceconnections.com/blog/2014/02/16/a-simple-promise-implementation-in-about-20-lines-of-javascript/)

2. [手把手教你实现一个完整的 Promise](https://www.cnblogs.com/huansky/p/6064402.html)