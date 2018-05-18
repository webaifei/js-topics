### diff 算法
> virtual dom技术 将我们的DOM树在内存中存放了一份JS的对象映射（js本身的执行效率很高，操作DOM的代价昂贵）
#### 传统的树结构比较
传统的将一颗树转换成另外一棵树的算法复杂度是O(n^3)(算法实现待研究)，那么我们现在有1000个dom节点的话，就是一亿次计算量

[简单例子](./on^3.html)中 只是一个简单的计算（一亿次）但是，平均耗时是2.4s，可以想象我们如果进行了更加复杂的逻辑处理会是什么情况~

#### 如何从O(n^3)实现O(n)算法
> 基于两点假设
1. Two elements of different types will produce different trees.（不同类型的元素将会产生不同的树）

2. The developer can hint at which child elements may be stable across different renders with a key prop.(开发者可以通过为同一层的子节点添加唯一key属性来优化)

3. DOM节点在不同层级的位置调整操作很少，可以忽略不计，实际项目中我们的DOM操作基本上几种这几个方面
    1. 显示，隐藏元素， 包含简单节点和复杂节点（比如列表页，切换到了详情页）
    2. 更改某个元素的样式
    3. 新增，删除，移动某个元素

#### 根据两个假设需要注意的事情
1. 相同的结构不要更改父节点的类型（千万不要这么干）
```
// 当返回跳转地址的时候 
<a href={href}>
  <YourComponent/> // 比较复杂的一个组件
</a>
// 没有返回跳转地址的时候
<p>
  <YourComponent/>
</p>
```
当然，如果你的子组件如果很简单的话，可以忽略这条

2. 为同一层级的子组件添加key属性

```
// key属性一定是唯一不变化的


```



#### 算法过程
1. Elements Of Different Types
```
针对不同类型的元素的比较，react处理策略根据假设1 直接销毁原来的元素，创建新的节点
```

2. DOM Elements Of The Same Type
```
针对同种类型的React DOM 元素，react比对两个元素的属性，找到属性不同的地方进行更新
```
3. Component Elements Of The Same Type
```
针对相同类型的组件元素，

默认情况下，使用新的props和state 调用render 生成一颗新树， 然后和之前的树进行递归对比

如果我们重写了shouldComponentUpdate或者是继承了 PureComponent ，那么就会根据作者的意图来选择是否执行render，生成一颗新树进行diff algorithm
```
4.  Recursing On Children（递归比较子组件）
```
经过上面3中比较之后，react就会对两棵树的children进行比较

4.1 默认情况下，在递归一个DOM node 的 children的时候，react仅仅是同时遍历两个children的list，找到不同的节点进行对应的操作
  1) 节点类型不同 直接删除原节点 添加新节点
  2) 节点类型相同 属性不同 修改属性
  3) 都相同那就不做修改

对于在children列表非最后的位置插入新节点，可能会有如下的问题：
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
react在遍历新旧节点list的时候发现 都节点属性都变换了，所以会造成三个节点都被修改一次，并不能准确的知道我们只是在开始的位置插入了一个新的节点（而在dom操作中 这种插入操作又非常的常见）
```
4.2 未children 添加key属性
为了解决上面的问题，react支持通过添加key来进行优化
```
<ul>
  <li key="Duke">Duke</li>
  <li key="Villanova">Villanova</li>
</ul>

<ul>
  <li key="Connecticut">Connecticut</li>
  <li key="Duke">Duke</li>
  <li key="Villanova">Villanova</li>
</ul>

这样，react在遍历children的子元素的时候 可以通过key来确认这个节点到底是否发生了变化

TIPS: 
请注意上面的写法，key并不是取数组的索引，因为那样的话，和没有增加key的结果一样，并不会帮助react意识到哪个节点发生了变化，哪些没有
然后再实际开发中，这样的代码却随处可见
```

