/* Structure of Binary Tree Node
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}*/

/**
 * @param {Node} root
 * @returns {number}
 */

class Solution {
  maxDiff(root) {
    // Start with negative infinity because the final answer can be negative.
    let ans = Number.NEGATIVE_INFINITY;

    // This helper returns the minimum value present in a subtree.
    const dfs = (node) => {
      // A missing node should not affect the minimum calculation.
      if (node === null) {
        return Number.POSITIVE_INFINITY;
      }

      // Find the minimum values from both child subtrees.
      const leftMin = dfs(node.left);
      const rightMin = dfs(node.right);

      // If the left subtree exists, compare the current node
      // with the smallest descendant from that subtree.
      if (node.left !== null) {
        ans = Math.max(ans, node.data - leftMin);
      }

      // If the right subtree exists, compare the current node
      // with the smallest descendant from that subtree.
      if (node.right !== null) {
        ans = Math.max(ans, node.data - rightMin);
      }

      // Return the smallest value in this subtree to the parent.
      return Math.min(node.data, leftMin, rightMin);
    };

    // Traverse the tree and update ans during the DFS.
    dfs(root);

    // Return the maximum ancestor - descendant difference.
    return ans;
  }
}
