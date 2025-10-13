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
  // returns [take, notTake]
  dfs(root) {
    if (root === null) return [0, 0];
    const left = this.dfs(root.left);
    const right = this.dfs(root.right);

    // take current -> can't take children
    const take = root.data + left[1] + right[1];
    // don't take current -> children can be taken or not taken
    const notTake = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return [take, notTake];
  }

  getMaxSum(root) {
    const res = this.dfs(root);
    return Math.max(res[0], res[1]);
  }
}
