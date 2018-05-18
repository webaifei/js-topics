### react 最佳实践

1. 增加属性类型检测 代码的健壮性
```
import PropTypes from 'prop-types';

YourComponent.propTypes = {
  name: PropTypes.string
};
```
2. 默认属性设置
```
YourComponent.defaultProps = {
  name: 'Stranger'
};
```
3. 使用 react-dev-tool 来检测
4. 使用shouldComponentUpdate或者使用PureComponent实现性能优化
5. 在constructor中绑定this
```
// 避免下面的用法
<a onClick={(e)=>this.clickHandle(e)}>
// 使用如下方法来实现
constructor() {
	this.clickHandle = this.clickHandle.bind(this)
}
```
6. 使用key，并且正确使用key帮助react提升性能

注意不要给子组件的key设置为index 因为这样并没有解决我们的问题 

详见[react diff 算法](./diff-algorithm.md)

7. 请把异步请求等side effect 操作 放到componentDidMount中 
具体原因参考：[客户端请求应该放到什么地方](https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/)


	