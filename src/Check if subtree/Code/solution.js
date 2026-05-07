/*
Definition for Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/
class Solution {
  // Function to check if two trees are identical
  isSame(a, b) {
    // If both nodes are null
    if (a === null && b === null) return true;

    // If one node is null
    // structures are different
    if (a === null || b === null) return false;

    // Node values must match
    if (a.data !== b.data) return false;

    // Recursively compare left and right subtrees
    return this.isSame(a.left, b.left) && this.isSame(a.right, b.right);
  }

  isSubTree(root1, root2) {
    // Empty tree is always a subtree
    if (root2 === null) return true;

    // Main tree exhausted
    if (root1 === null) return false;

    // Check whether trees match from current node
    if (this.isSame(root1, root2)) return true;

    // Otherwise search in left and right subtree
    return (
      this.isSubTree(root1.left, root2) || this.isSubTree(root1.right, root2)
    );
  }
}
