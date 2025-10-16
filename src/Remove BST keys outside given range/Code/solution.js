/**
 * @param {Node} root
 * @param {number} l
 * @param {number} r
 * @return {Node}
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
  removekeys(root, l, r) {
    if (root === null) return null;

    // If node value is less than l -> left subtree all too small
    if (root.data < l) {
      return this.removekeys(root.right, l, r);
    }

    // If node value is greater than r -> right subtree all too large
    if (root.data > r) {
      return this.removekeys(root.left, l, r);
    }

    // Node is within range -> keep it and process children
    root.left = this.removekeys(root.left, l, r);
    root.right = this.removekeys(root.right, l, r);
    return root;
  }
}
