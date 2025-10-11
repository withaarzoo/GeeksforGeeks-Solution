/**
 * @param {Node} root
 * @returns {number}
 */

/*
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  findMaxSum(root) {
    if (!root) return 0;
    let globalMax = Number.MIN_SAFE_INTEGER;

    function dfs(node) {
      if (!node) return 0;
      let left = Math.max(0, dfs(node.left)); // ignore negative left
      let right = Math.max(0, dfs(node.right)); // ignore negative right

      // best path through node
      const current = node.data + left + right;
      globalMax = Math.max(globalMax, current);

      // best path to parent
      return node.data + Math.max(left, right);
    }

    dfs(root);
    return globalMax;
  }
}
