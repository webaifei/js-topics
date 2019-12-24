function Node(val) {
  this.val = val;
  this.right = this.left = null;
}

function BST() {
  this.root = null;
  this.size = 0;
}
/**
 * 添加元素到二分搜索树中
 */
BST.prototype.add = function (val) {
  var node = new Node(val);
  if(this.root == null) {
    this.root = node;
    return;
  }
  this._add(this.root, node);
}
/**
 * 递归添加元素
 * 1. 先确定递归终止条件
 * 2. 后书写递归逻辑
 */
BST.prototype._add = function (root, node) {
  // 小于当前root节点 
  if(node.val < root.val && root.left == null) {
    root.left = node;
    return;
  }
  // 大于当前root节点
  if(node.val > root.val && root.right == null) {
    root.right = node;
    return;
  }

  // 小于当前root节点 
  if(node.val < root.val) {
    this._add(root.left, node);
    return;
  }
  // 大于当前root节点
  if(node.val > root.val) {
    this._add(root.right, node);
    return;
  }
}

/**
 * 前序遍历
 */
BST.prototype.preOrder = function () {
  var root = this.root;
  if(root == null) {
    return;
  }
  this._traverse(root.left);
  this._traverse(root.right);
}

BST.prototype._traverse = function (root) {
  if(root == null) {
    return;
  }
  if(root.left != null) {
    this._traverse(root.left);
  }
  console.log(root);
  if(root.right != null) {
    this._traverse(root.right);
  }
}