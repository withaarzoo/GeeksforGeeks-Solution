/**
 * @param {Node} root
 * @return {void}
 */

/*
class Node
{
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

class Solution {
  transformTree(root) {
    // Use a closure variable to keep accumulator across recursive calls
    let acc = 0;

    // recursive reverse in-order traversal
    function dfs(node) {
      if (node === null) return;

      // visit right subtree first (greater values)
      dfs(node.right);

      // current node: replace with sum of greater nodes which is acc
      const original = node.data;
      node.data = acc;

      // include original value into accumulator for later (smaller) nodes
      acc += original;

      // visit left subtree
      dfs(node.left);
    }

    dfs(root);
  }
}
