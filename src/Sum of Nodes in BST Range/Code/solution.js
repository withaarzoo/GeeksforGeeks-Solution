/**
 * @param {Node} root
 * @param {Number} l
 * @param {Number} r
 * @returns {Number}
 */

/*
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
  nodeSum(root, l, r) {
    if (root === null) return 0; // base case
    // If current node value is less than l, skip left subtree
    if (root.data < l) return this.nodeSum(root.right, l, r);
    // If current node value is greater than r, skip right subtree
    if (root.data > r) return this.nodeSum(root.left, l, r);
    // Current node is inside range: include it and search both sides
    return (
      root.data + this.nodeSum(root.left, l, r) + this.nodeSum(root.right, l, r)
    );
  }
}
