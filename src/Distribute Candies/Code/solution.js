/**
 * @param {Node} root
 * @return {number}
 */

/*
class Node {
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

class Solution {
  constructor() {
    this.moves = 0;
  }

  // post-order DFS returns subtree balance
  dfs(node) {
    if (node === null) return 0;
    const leftBal = this.dfs(node.left);
    const rightBal = this.dfs(node.right);

    this.moves += Math.abs(leftBal) + Math.abs(rightBal);

    const balance = node.data + leftBal + rightBal - 1;
    return balance;
  }

  distCandy(root) {
    this.moves = 0;
    this.dfs(root);
    // moves fits into Number for constraints; return as integer
    return this.moves;
  }
}
