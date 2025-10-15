/**
 * @param {Node} root
 * @param {number} k
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
  kthSmallest(root, k) {
    // Iterative inorder traversal with stack
    const st = [];
    let curr = root;

    while (curr !== null || st.length > 0) {
      // go left
      while (curr !== null) {
        st.push(curr);
        curr = curr.left;
      }

      // visit node
      curr = st.pop();
      k--;
      if (k === 0) return curr.data; // found k-th smallest

      // go right
      curr = curr.right;
    }

    // if k is larger than number of nodes
    return -1;
  }
}
